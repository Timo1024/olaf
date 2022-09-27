import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { printArchive } from "./archiveLib";
var fs = require("fs");

export const viewArchive: Command = {
    name: archive.viewArchive.name,
    description: archive.viewArchive.description,
    options: [
        {
            name: archive.viewArchive.options[0].name,
            description: archive.viewArchive.options[0].description,
            type: "INTEGER",
            required: true
        }
    ],
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {

        let readStream = fs.createReadStream("src/data/archive/main.archive", 'utf8');

        let archiveChunk : string;

        readStream.on('data', async function(chunk : string){
            archiveChunk = chunk;
        
            // getting all options of the command
            const number     : string = (interaction.options.get(archive.editArchive.options[0].name)?.value as number).toString();

            // searching in the archive for the number given
            let archiveSplitted : string[] = archiveChunk.split("\n");
            let quote : string = "";
            archiveSplitted.forEach((line : string) => {
                if(line.startsWith(number + "|")){
                    quote = line;
                }
            });

            if(quote !== ""){
                
                const infos : string[] = quote.split("|");
                const content : string = infos[1];
                const person : string = infos[2];
                const date : string = infos[3];

                const response : MessageEmbed = printArchive(number, content, person, date);
    
                await interaction.followUp({embeds: [ response ]});

            } else {
                let lastNumber : string = archiveSplitted.pop()?.split("|")[0] as string;
                
                await interaction.followUp({ 
                    content: 'Didn\'t fing the quote. Use a number between 1 and ' + lastNumber, 
                    ephemeral: true })
            }
        });
    }
};