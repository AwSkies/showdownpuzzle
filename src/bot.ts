import { Protocol } from "@pkmn/protocol";
import { Actions } from "@pkmn/login";
import Connection from "./utils/connection";

const self = globalThis;

self.onmessage = ({ data }) => {
    const BYPASS_CORS = 'https://cors-anywhere.herokuapp.com/';
    const { username, password } = data;
    const connection = new Connection();

    // Create new instance of anonymous class which implements handler
    // This will handle all communications sent from Showdown 
    const handler = new class implements Protocol.Handler {
        async '|challstr|'(args: Protocol.Args['|challstr|']) {
            const challstr = args[1];
            const action = Actions.login({ username, password, challstr });
            const response = await (await fetch(BYPASS_CORS + action.url, {
                method: action.method,
                headers: action.headers as HeadersInit,
                body: action.data,
            })).text();
            const cmd = action.onResponse(response);
            if (cmd)
                connection.send(cmd);
        }

        '|updateuser|'(args: Protocol.Args['|updateuser|']) {
            console.log(`Logged in as \`${args[1].trim()}\``);
        }
    }();

    // Open connection with message handler
    connection.open(data => {
        console.log(data);

        // Parse each line of data
        const parser = Protocol.parse(data.toString());
        let current = parser.next();
        while (!current.done) {
            // Call the corresponding handler function with the correct args and kwArgs
            const {args, kwArgs} = current.value;
            const key = Protocol.key(args);
            if (key && key in handler) 
                (handler as any)[`${key}`](args, kwArgs);
            
            current = parser.next();
        }
    });
};
