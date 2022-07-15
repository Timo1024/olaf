import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { UICommand } from "../../Command";
import { message_info } from "../../parameters/commands.json"

// TODO make dev command only
export const MessageInfo: UICommand = {
    name: message_info.name,
    type: "MESSAGE",
    
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        const message_data = interaction.options.data[0].message
        
        let response : MessageEmbed;
        
        if(message_data){

            response = new MessageEmbed()
                .setTitle("Information about this message")
                .setColor("#64FF00")

            let bot : string = message_data.author.bot ? "is" : "is not";

            // user infos
            response.addField(
                `Information about the user`, 
                `The full username of the author of the message is ${message_data.author.username}#${message_data.author.discriminator}. This user ${bot} a bot.`, 
                false
            );

            let embed : string = (message_data.embeds.length == 1) ? 
                "A embed is attached to this message. " 
                : (message_data.embeds.length > 1) ? 
                `${message_data.embeds.length} embeds are attached to this message. ` :
                "";

            let msg_content : string = (message_data.content.length == 0) ? 
                "" : 
                `The content of this message is \n*${message_data.content}*\n`;

            // content infos
            response.addField(
                `Information about the content`, 
                `${msg_content}${embed}`, 
                false
            );

        } else {

            response = new MessageEmbed().setDescription("no message selected");

        }

        await interaction.followUp({
            ephemeral: true, 
            embeds: [ response ]
        });
    }
}; 