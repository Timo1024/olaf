import { CommandInteraction, Client, Guild, GuildMember, EmbedBuilder, User, TextBasedChannel } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { openai as ai} from "../../parameters/commands.json";
import { openai_api_key } from "../../auth.json";
import { Configuration, OpenAIApi } from "openai";
import { makeDescription } from "../../lib/generalLib";

export const AskDavinci: Command = {
    name: ai.davinci.ask.name,
    description: makeDescription(ai.davinci.ask),
    options: [
        {
            name: ai.davinci.ask.options[0].name,
            description: ai.davinci.ask.options[0].description,
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        // let thisChannel : TextBasedChannel = interaction.channel as TextBasedChannel;
        await interaction.deferReply();
        
        let question : string = "no question was asked, but I respond anyway..."
        question = interaction.options.get(ai.davinci.ask.options[0].name)?.value as string

        const configuration = new Configuration({
            apiKey: openai_api_key
        });

        const openai = new OpenAIApi(configuration);
        
        // const completion = await openai.createCompletion({
        await openai.createCompletion({
            model: "text-davinci-003",
            // model: "text-ada-001",
            // model: "text-davinci-003",
            prompt: question,
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }).then((completion) => {
            console.log("here should follow the edit of the reply:");
            console.log(completion.data.choices);
            interaction.editReply(
                completion.data.choices[0].text?.slice(0, 1999) as string
            );
        })

        // console.log("response:");
        // console.log(completion.data.choices);

        // await interaction.editReply(
        //     completion.data.choices[0].text as string
        // );
    }
};
