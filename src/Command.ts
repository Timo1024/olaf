import { BaseCommandInteraction, ChatInputApplicationCommandData, Client, MessageApplicationCommandData } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void;
}

export interface UICommand extends MessageApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void;
}