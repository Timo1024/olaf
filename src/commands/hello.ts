import { CommandInteraction, Client } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../Command";
import { hello } from "../parameters/commands.json"
import { makeDescription } from "../lib/generalLib";

// TODO make dev command only
export const Hello: Command = {
    name: hello.name,
    description: makeDescription(hello),
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
        const content : string = "Moin, werde grade wiederbelebt... und bin jetzt über einen externen Server online";

        await interaction.reply({
            ephemeral: true,
            content
        });
    }
}; 