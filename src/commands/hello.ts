import { CommandInteraction, Client } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../Command";
import { hello } from "../parameters/commands.json"

// TODO make dev command only
export const Hello: Command = {
    name: hello.name,
    description: hello.description,
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
        const content : string = "Moin, werde grade wiederbelebt... und bin jetzt über einen externen Server online";

        await interaction.reply({
            ephemeral: true,
            content
        });
    }
}; 