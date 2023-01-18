import { CommandInteraction, Client, Guild, GuildMember, EmbedBuilder, User, TextBasedChannel } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder  } from 'discord.js';
import { Command } from "../../Command";
import { openai as ai } from "../../parameters/commands.json";
import { openai_api_key } from "../../auth.json";
import { Configuration, OpenAIApi } from "openai";
import { makeDescription } from "../../lib/generalLib";
import { checkIfEnoughTokens, updateTokens } from "../../lib/xpLib";

export const ImageDallE: Command = {
    name: ai.dalle.image.name,
    description: makeDescription(ai.dalle.image),
    options: [
        {
            name: ai.dalle.image.options[0].name,
            description: ai.dalle.image.options[0].description,
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        await interaction.deferReply();

        if(await checkIfEnoughTokens(interaction.guild?.id as string, interaction.user.id, 20)){
        
            let question : string = "no question was asked, but I respond anyway..."
            question = interaction.options.get(ai.dalle.image.options[0].name)?.value as string

            const configuration = new Configuration({
                apiKey: openai_api_key
            });

            const openai = new OpenAIApi(configuration);
            
            await openai.createImage({
                prompt: question,
                n: 1,
                size: "1024x1024"
            }).then((response) => {
                console.log("here should follow the edit of the reply:");
                console.log(response.data.data[0].url);
                interaction.editReply({ 
                    files: [{
                        attachment: response.data.data[0].url as string, name: "image.jpg"
                    }]
                });

                // update tokens
                updateTokens(interaction.guild?.id as string, interaction.user.id, -20);

            })

        } else {
            interaction.editReply(
                "You don't have enough tokens to use this command"
            )
        }
    }
};