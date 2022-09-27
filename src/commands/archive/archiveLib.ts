import { ColorResolvable, MessageEmbed } from "discord.js";

// returns an embed whch contains the quote
export function printArchive(
    number : string, 
    content : string, 
    person : string,
    date : string,
    color : ColorResolvable = "#64FF00"
    ) : MessageEmbed {

        let contentWithLinebreaks : string = "";
        let contentArray : string[] = content.split("\\n");
        contentArray.forEach(line => {
            contentWithLinebreaks += line + "\n";
        });

        const response : MessageEmbed = new MessageEmbed()
            .setColor(color)
            .addFields(
                { name: contentWithLinebreaks, value : person + ", " + date }
            )
            .setFooter({
                text : '#' + number
            })
        
        return response;
    }