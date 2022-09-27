import { BaseCommandInteraction, Client, Guild, GuildMember, MessageEmbed, User } from "discord.js";
import { Command } from "../Command";
import { miesmuschel } from "../parameters/commands.json";

export const Miesmuschel: Command = {
    name: miesmuschel.name,
    description: miesmuschel.description,
    options: [
        {
            name: miesmuschel.options[0].name,
            description: miesmuschel.options[0].description,
            type: "STRING",
            required: true
        }
    ],
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
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
    }
};

