import { Protocol } from "@pkmn/protocol";
import { Actions } from "@pkmn/login";
import Connection from "./utils/connection";
import { print } from "./utils/print-colored";
import { Puzzle } from "./utils/puzzle";

const self = globalThis;

self.onmessage = ({ data }) => {
    const BYPASS_CORS = 'https://corsproxy.io/?';
    const { username, password, puzzle, challenger }: { username: string, password: string, puzzle: Puzzle, challenger: string } = data;
    const user = new User();

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
                user.send(cmd);
        }

        '|updateuser|'(args: Protocol.Args['|updateuser|']) {
            print(`Logged in as \`${args[1].trim()}\``);
            // TODO: Change avatar?
        }

        '|init|'(args: Protocol.Args['|init|']) {
            print(`Beginning ${args[1]}`);
        }

        '|request|'(args: Protocol.Args['|request|']) {
            const { active, side } = JSON.parse(args[1]);
            // TODO: Puzzle command logic
        }
    }();

    // Open connection with message handler
    user.open(data => {
        // Parse each line of data
        const parser = Protocol.parse(data.toString());
        let current = parser.next();
        while (!current.done) {
            // Call the corresponding handler function with the correct args and kwArgs
            const { args, kwArgs } = current.value;
            const key = Protocol.key(args);
            if (key && key in handler)
                (handler as any)[`${key}`](args, kwArgs);

            current = parser.next();
        }
    });
};
