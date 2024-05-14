import { Protocol } from "@pkmn/protocol";
import { Actions } from "@pkmn/login";
import { Sets } from "@pkmn/sets";
import { print } from "./print-colored";
import { puzzleDefaults, Puzzle } from "./puzzle";
import User from "./user";

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
            if (puzzle.avatar) {
                user.sendCommand('avatar', [puzzle.avatar]);
            }
            this.challenge();
        }

        '|updateuser|'(args: Protocol.Args['|updateuser|']) {
            print(`Logged in as \`${args[1].trim()}\` with avatar \`${args[3]}\``);
        }

        '|init|'(args: Protocol.Args['|init|']) {
            print(`Beginning ${args[1]}`);
        }

        '|request|'(args: Protocol.Args['|request|']) {
            const json = args[1];
            if (json) {
                const { active, side } = JSON.parse(args[1]);
                // TODO: Puzzle command logic
            }
        }

        '|-crit|'(args: Protocol.Args['|-crit|']) {
            if (!puzzle.crits) {
                user.send(`Critical hit detected. Aborting puzzle and resending a challenge to ${challenger}.`);
                user.sendCommand('forfeit');
                this.challenge();
            }
        }

        challenge() {
            // TODO: Figure out and fix challenging logic
            user.sendCommand('challenge', [challenger, /*puzzle.team?.format as string*/'gen9nationaldexubers']);
        }
    }();

    // Open connection with message handler
    user.open(data => {
        // Parse each line of data
        const parser = Protocol.parse(data.toString());
        let current = parser.next();
        while (!current.done) {
            // Call the corresponding handler function with the correct args and kwArgs
            const { roomid, args, kwArgs } = current.value;
            const key = Protocol.key(args);
            if (key && key in handler) {
                user.roomid = roomid;
                (handler as any)[`${key}`](args, kwArgs);
            }

            current = parser.next();
        }
    });
};
