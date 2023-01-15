import { CommandInteraction, Client, EmbedBuilder } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { printArchive } from "./archiveLib";
var fs = require("fs");

export const viewRandomArchive: Command = {
    name: archive.viewRandomArchive.name,
    description: archive.viewRandomArchive.description,
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        const path : string = "src/data/archive/main.archive";

        if(fs.existsSync(path)){

            let readStream = fs.createReadStream(path, 'utf8');
            
            let archiveChunk : string;
            
            readStream.on('data', async function(chunk : string){
                
                archiveChunk = chunk;

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
        
                    const response : EmbedBuilder = printArchive(number, content, person, date);
                    await interaction.reply({embeds: [ response ]});

                } else {
                    await interaction.reply({ 
                        content: 'Didn\'t find the quote', 
                        ephemeral: true })
                }
            });
        } else {
            await interaction.reply({ 
                content: 'There are no quotes yet', 
                ephemeral: true 
            });
        }
    }
};