import { CommandInteraction, Client, Guild, GuildMember, EmbedBuilder, User } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../Command";
import { miesmuschel } from "../parameters/commands.json";
import { makeDescription } from "../lib/generalLib";
import { updateTokens } from "../lib/xpLib";

export const Miesmuschel: Command = {
    name: miesmuschel.name,
    description: makeDescription(miesmuschel),
    options: [
        {
            name: miesmuschel.options[0].name,
            description: miesmuschel.options[0].description,
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
        let question : string = "no question was asked, but I respond anyway..."
        question = interaction.options.get(miesmuschel.options[0].name)?.value as string
        
        let response : string = "default";

        const random = Math.random();

        for(var i = 0; i < miesmuschel.parameters.answers.length; i++){

            if(random < (1/miesmuschel.parameters.answers.length) * (i+1)){
                response = miesmuschel.parameters.answers[i];
                break;
            }

        }

        await interaction.reply(
            "Question:\t" + question + "\nAnswer:  \t " + response
        );

        updateTokens(interaction.guild?.id as string, interaction.user.id, 1);

    }
};

