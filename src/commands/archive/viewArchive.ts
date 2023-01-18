import { CommandInteraction, Client, EmbedBuilder } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { printArchive } from "./archiveLib";
import { makeDescription } from "../../lib/generalLib";
var fs = require("fs");

export const viewArchive: Command = {
    name: archive.viewArchive.name,
    description: makeDescription(archive.viewArchive),
    options: [
        {
            name: archive.viewArchive.options[0].name,
            description: archive.viewArchive.options[0].description,
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        const path : string = "src/data/archive/main.archive";

        if(fs.existsSync(path)){

            let readStream = fs.createReadStream(path, 'utf8');

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

                    const response : EmbedBuilder = printArchive(number, content, person, date);
        
                    await interaction.reply({embeds: [ response ]});

                } else {
                    let lastNumber : string = archiveSplitted.pop()?.split("|")[0] as string;
                    
                    await interaction.reply({ 
                        content: 'Didn\'t find the quote. Use a number between 1 and ' + lastNumber, 
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