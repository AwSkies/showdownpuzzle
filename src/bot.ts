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
            console.log(data);
            const parsedData = Protocol.parse(data.toString());
            let current = parsedData.next();
            while (!current.done) {
                // TODO: Login and bot logic
                current = parsedData.next();
            }
        });
    };
}

export default bot;
