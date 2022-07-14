import { BaseCommandInteraction, Client, Guild, GuildMember, MessageEmbed, User } from "discord.js";
import { Command } from "../Command";
import { miesmuschel } from "../parameters/commands.json";

export const UserInfo: Command = {
    name: miesmuschel.name,
    description: miesmuschel.description,
    options: [
        {
            name: miesmuschel.options[0].name,
            description: miesmuschel.options[0].description,
            type: "STRING"
        }
    ],
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        let response : string = "default";

        const random = Math.random();

        for(var i = 0; i < miesmuschel.parameters.answers.length; i++){

            if(random < (1/miesmuschel.parameters.answers.length) * (i+1)){
                response = miesmuschel.parameters.answers[i];
                break;
            }

        }

        await interaction.followUp(response);
    }
};

