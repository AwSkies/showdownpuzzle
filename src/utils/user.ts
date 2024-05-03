import Connection from "./connection";

export default class User extends Connection {
    send(message: string | ArrayBufferLike | Blob | ArrayBufferView, roomID?: string): void {
        super.send((roomID ? `>${roomID}\n` : '') + message);
    }

    sendCommand(command: string, args: string[] = [], roomID?: string) {
        this.send(`/${command} ${args.join(' ')}`, roomID);
    }
}
