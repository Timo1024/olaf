import { CommandInteraction, Client, EmbedBuilder } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { developer, makeDescription } from "../../lib/generalLib";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
var fs = require("fs");

export const deleteArchive: Command = {
    name: archive.deleteArchive.name,
    description: makeDescription(archive.deleteArchive),
    options: [
        {
            name: archive.deleteArchive.options[0].name,
            description: archive.deleteArchive.options[0].description,
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        // checking if the user who used the command is a developer
        if(await developer(interaction)){

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
                    let newArchiveSplitted : string[] = [];
                    let foundQuote : boolean = false;
                    archiveSplitted.forEach((line : string) => {
                        if(line.startsWith(number + "|")){
                            foundQuote = true;
                        } else {
                            newArchiveSplitted.push(line)
                        }
                    });

                    if(foundQuote){

                        // generating new file
                        for(let i = 0; i<newArchiveSplitted.length; i++){
                            newArchiveSplitted[i] = (i+1).toString() + "|" + newArchiveSplitted[i].split("|").slice(1).join("|");
                        }

                        let newArchive : string = newArchiveSplitted.join("\n");
            
                        const response : string = "Archive #" + number + " has been deleted";
                        await interaction.reply({ 
                            content: response, 
                            ephemeral: true 
                        });

                        fs.writeFile(path, newArchive, async (err : Error) => {
                            if (err) {
                                console.error(err);
                            }
                        });

                    } else {
                        let lastNumber : string = archiveSplitted.pop()?.split("|")[0] as string;
                        
                        await interaction.reply({ 
                            content: 'Didn\'t fing the quote. For the number of the quote use a number between 1 and ' + lastNumber, 
                            ephemeral: true 
                        })
                    }
                });
            } else {
                await interaction.reply({ 
                    content: 'There are no quotes yet', 
                    ephemeral: true 
                });
            }
        } else {
            // if user is not a developer
            await interaction.reply({ 
                content: 'you don\'t have permission to use this command. If you want to edit this quote contact a user with vip rank', 
                ephemeral: true 
            });
        }
    }
};