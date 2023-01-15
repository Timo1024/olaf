import { CommandInteraction, Client, EmbedBuilder } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { UICommand } from "../../Command";
import { message_info } from "../../parameters/commands.json"

// TODO make dev command only
export const MessageInfo: UICommand = {
    name: message_info.name,
    type: ApplicationCommandType.Message,
    
    run: async (client: Client, interaction: CommandInteraction) => {
        
        const message_data = interaction.options.data[0].message
        
        let response : EmbedBuilder;
        
        if(message_data){

            response = new EmbedBuilder()
                .setTitle("Information about this message")
                .setColor("#64FF00")

            let bot : string = message_data.author.bot ? "is" : "is not";

            // user infos
            response.addFields({
                name : `Information about the user`, 
                value : `The full username of the author of the message is ${message_data.author.username}#${message_data.author.discriminator}. This user ${bot} a bot.`, 
                inline : false
            });

            let embed : string = (message_data.embeds.length == 1) ? 
                "A embed is attached to this message. " 
                : (message_data.embeds.length > 1) ? 
                `${message_data.embeds.length} embeds are attached to this message. ` :
                "";

            let msg_content : string = (message_data.content.length == 0) ? 
                "" : 
                `The content of this message is \n*${message_data.content}*\n`;

            // content infos
            response.addFields({
                name : `Information about the content`, 
                value : `${msg_content}${embed}`, 
                inline : false
            });

        } else {

            response = new EmbedBuilder().setDescription("no message selected");

        }

        await interaction.reply({
            ephemeral: true, 
            embeds: [ response ]
        });
    }
}; 