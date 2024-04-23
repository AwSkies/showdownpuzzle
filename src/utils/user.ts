import { Action, Actions, LoginDetails } from "@pkmn/login";
import { request } from "https";
import Connection from "./connection";

function fetch(action: Action, cookie: any) {
    const headers = cookie ? { 'Set-Cookie': cookie, ...action.headers } : action.headers;
    return new Promise<string>((resolve, reject) => {
        let buf = '';
        const req = request(action.url, { method: action.method, headers }, res => {
            if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
            const sid = res.headers['set-cookie']?.find(c => c.startsWith('sid='));
            // username,session,rawsid
            if (sid) console.log('SID:', decodeURIComponent(sid.split(';')[0].slice(4)));
            res.on('data', d => {
                buf += d;
            });
            res.on('end', () => resolve(buf));
        });
        req.on('error', reject);
        req.write(action.data);
        req.end();
    });
}

export default class User {
    connection: Connection;
    username: string = '';

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async login(details: LoginDetails) {
        this.username = details.username;
        const action = Actions.login(details);
        const cmd = action.onResponse(await fetch(action, null));
        if (cmd)
            this.connection.send(cmd);
    }

    async upkeep(details: LoginDetails, cookie: any) {
        this.username = details.username;
        const action = Actions.upkeep(details);
        const cmd = action.onResponse(await fetch(action, cookie));
        if (cmd)
            this.connection.send(cmd);
    }

    async logout() {
        if (this.username) {
            const action = Actions.logout({ username: this.username });
            const cmd = action.onResponse(await fetch(action, null));
            if (cmd)
                this.connection.send(cmd);
        }
    }
}