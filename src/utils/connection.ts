import { colors, print } from "./print-colored";

const server = 'sim.smogon.com';
const serverport = 8000;

class Connection {
    ws!: WebSocket;
    
    open(fn: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void) {
        this.ws = new WebSocket(`ws://${server}:${serverport}/showdown/websocket`);
        this.ws.onmessage = ({ data }) => {
            print(`Message received:\n${data}`, console.debug, colors.cyan);
            fn(data);
        };
        this.ws.onopen = () => {
            print(`Connected to ${this.ws.url}`);
        };
        this.ws.onclose = e => {
            const clean = e.wasClean ? ' cleanly ' : ' ';
            const reason = e.reason ? `: ${e.reason}` : '';
            print(`Disconnected${clean}from ${this.ws.url} with ${e.code}${reason}`);
        };
        this.ws.onerror = e => {
            const msg = (e as ErrorEvent).message;
            if (msg === 'TIMEOUT') return;
            print(`Connection error${msg ? `: ${msg}` : ''}`, console.error);
        };
    }

    close() {
        this.ws.close();
    }

    send(message: string | ArrayBufferLike | Blob | ArrayBufferView) {
        this.ws.send(message);
        print(`Message sent:\n${message}`, console.debug, colors.green);
    }
}

export default Connection;
