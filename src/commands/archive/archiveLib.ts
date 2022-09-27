import { MessageEmbed } from "discord.js";

// returns an embed whch contains the quote
export function printArchive(
    number : string, 
    content : string, 
    person : string,
    date : string
    ) : MessageEmbed {

        let contentWithLinebreaks : string = "";
        let contentArray : string[] = content.split("\\n");
        contentArray.forEach(line => {
            contentWithLinebreaks += line + "\n";
        });

        const response : MessageEmbed = new MessageEmbed()
            .setColor("#64FF00")
            .addFields(
                { name: contentWithLinebreaks, value : person + ", " + date }
            )
            .setFooter({
                text : '#' + number
            })
        
        return response;
    }