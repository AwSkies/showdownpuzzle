import { login } from "@pkmn/login";
import Connection from "./utils/connection";

const bot = () => {
    onmessage = ({ data }) => {
        // TODO: Login
        // TODO: The rest of the Showdown bot logic
        postMessage(`U: ${data.username}, P: ${data.password}`);
    };
}

export default bot;