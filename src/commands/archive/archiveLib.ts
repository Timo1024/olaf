import { MessageEmbed } from "discord.js";

// returns an embed whch contains the quote
export function printArchive(
    number : string, 
    content : string, 
    person : string,
    date : string
    ) : MessageEmbed {

        const response : MessageEmbed = new MessageEmbed()
            .setColor("#64FF00")
            .addFields(
                { name: content, value : person + ", " + date }
            )
            .setFooter({
                text : '#' + number
            })
        
        return response
    }