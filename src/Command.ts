import { CommandInteraction, ChatInputApplicationCommandData, Client, MessageApplicationCommandData } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
}

export interface UICommand extends MessageApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
}