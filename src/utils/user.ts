import Connection from "./connection";

export default class User extends Connection {
    roomid = '';
    
    send(message: string | ArrayBufferLike | Blob | ArrayBufferView): void {
        super.send((this.roomid ? `>${this.roomid}\n` : '') + message);
    }

    sendCommand(command: string, args: string[] = []) {
        this.send(`/${command} ${args.join(', ')}`);
    }
}
