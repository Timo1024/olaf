import { Client, ClientOptions } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { token } from "./auth.json"

console.log("Bot is starting...");

const client = new Client({
    intents: ["GUILD_MEMBERS"]
});

ready(client);
interactionCreate(client);

client.login(token);