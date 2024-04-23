import { Protocol } from "@pkmn/protocol";
import Connection from "./utils/connection";
import User from "./utils/user";

const bot = () => {
    onmessage = ({ data }) => {
        const username = data.username;
        const password = data.password;

        const connection = new Connection();
        const user = new User(connection);

        connection.open(data => {
            // TODO: Finish login logic
            console.log(data.toString());
            // TODO: The rest of the Showdown bot logic
        });
    };
}

export default bot;
