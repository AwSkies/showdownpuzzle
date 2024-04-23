const server = 'sim.smogon.com';
const serverport = 8000;

class Connection {
    ws!: WebSocket;
    
    open(fn: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void) {
        this.ws = new WebSocket(`ws://${server}:${serverport}/showdown/websocket`);
        this.ws.onmessage = ({ data }) => {
            fn(data);
        };
        this.ws.onopen = () => {
            console.log(`Connected to ${this.ws.url}`);
        };
        this.ws.onclose = e => {
            const clean = e.wasClean ? ' cleanly ' : ' ';
            const reason = e.reason ? `: ${e.reason}` : '';
            console.log(`Disconnected${clean}from ${this.ws.url} with ${e.code}${reason}`);
        };
        this.ws.onerror = e => {
            const msg = (e as ErrorEvent).message;
            if (msg === 'TIMEOUT') return;
            console.error(`Connection error${msg ? `: ${msg}` : ''}`);
        };
    }

    close() {
        this.ws.close();
    }

    send(message: string | ArrayBufferLike | Blob | ArrayBufferView) {
        this.ws.send(message);
    }
}

export default Connection;
