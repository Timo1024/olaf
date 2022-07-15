import { Channel } from "diagnostics_channel";
import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { send } from "../parameters/commands.json";
import { members } from "../parameters/server.json";

// TODO make dev command only
export const Send: Command = {
    name: send.name,
    description: send.description,
    options: [
        {
            name: send.options[0].name,
            description: send.options[0].description,
            type: "CHANNEL",
            required: true
        },
        {
            name: send.options[1].name,
            description: send.options[1].description,
            type: "STRING",
            required: true
        }
    ],
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        const channel = interaction.options.get(send.options[0].name)?.channel;
        const msg_content = interaction.options.get(send.options[1].name)?.value as string;

        let response : string = "Successfully sent!";

        if(members.owner.includes(interaction.user.id)){

            if(channel && msg_content){

                if(channel.type == "GUILD_TEXT"){

                    channel.send(msg_content);

                } else {

                    response = "Please select an text channel!";

                }

            } else {

                response = "Something went wrong :(";

            }
        } else {

            response = "You don't have the permission to use this command";

        }

        await interaction.followUp(response);
    }
}; 