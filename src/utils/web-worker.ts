export default class WebWorker extends window.Worker {
    constructor(worker: () => void) {
        const code = worker.toString();
        const blob = new Blob([`(${code})()`]);
        super(URL.createObjectURL(blob));
    }
}
