import { Client } from "discord.js";
import { Commands, UICommands } from "../Commands";

export default (client: Client): void => {

    client.on("ready", async () => {

        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);
        await client.application.commands.set(UICommands)

        console.log(`${client.user.username} is online`);

    });

};