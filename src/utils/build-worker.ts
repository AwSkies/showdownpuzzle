export default function buildWorker(worker: () => void) {
    const code = worker.toString();
    const blob = new Blob([`(${code})()`]);
    return new window.Worker(URL.createObjectURL(blob));
}  