import { CommandInteraction, Client, Guild, GuildMember, EmbedBuilder, User, TextBasedChannel } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { chatgpt } from "../../parameters/commands.json";
import { openai_api_key } from "../../auth.json";
import { Configuration, OpenAIApi } from "openai";
import { Channel } from "diagnostics_channel";

export const Ask: Command = {
    name: chatgpt.ask.name,
    description: chatgpt.ask.description,
    options: [
        {
            name: chatgpt.ask.options[0].name,
            description: chatgpt.ask.options[0].description,
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        await interaction.deferReply();

        // let thisChannel : TextBasedChannel = interaction.channel as TextBasedChannel;
        
        let question : string = "no question was asked, but I respond anyway..."
        question = interaction.options.get(chatgpt.ask.options[0].name)?.value as string
        
        // let response : string = "hello";

        const configuration = new Configuration({
            apiKey: openai_api_key
        });

        const openai = new OpenAIApi(configuration);

        // console.log("question:");
        // console.log(question);
        
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            // model: "text-davinci-002",
            prompt: question,
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })

        console.log("response:");
        console.log(completion.data.choices);

        // thisChannel.send(completion.data.choices[0].text as string);
        // console.log(interaction);

        await interaction.editReply(
            completion.data.choices[0].text as string
        );
    }
};
