import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { token } from "./auth.json"

console.log("Bot is starting...");

const client = new Client({
    intents: ["GUILD_MEMBERS", "GUILDS"]
});

process.on("unhandledRejection", async (err) => {
    console.error("Unhandled Promise Rejection:\n", err);
});
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Promise Exception:\n", err);
});
process.on("uncaughtExceptionMonitor", async (err) => {
    console.error("Uncaught Promise Exception (Monitor):\n", err);
});
process.on("multipleResolves", async (type, promise, reason) => {
    console.error("Multiple Resolves:\n", type, promise, reason);
});

ready(client);
interactionCreate(client);

client.login(token);