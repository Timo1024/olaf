import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { printArchive } from "./archiveLib";
var fs = require("fs");

export const viewRandomArchive: Command = {
    name: archive.viewRandomArchive.name,
    description: archive.viewRandomArchive.description,
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

            // get random line
            const randomInt : number = Math.floor(Math.random() * archiveSplitted.length);
            const quote : string = archiveSplitted[randomInt];

            if(quote != undefined){
                
                const infos : string[] = quote.split("|");
                const number : string = infos[0];
                const content : string = infos[1];
                const person : string = infos[2];
                const date : string = infos[3];
    
                const response : MessageEmbed = printArchive(number, content, person, date);
                await interaction.followUp({embeds: [ response ]});

            } else {
                await interaction.followUp({ 
                    content: 'Didn\'t fing the quote', 
                    ephemeral: true })
            }
        });
    }
};