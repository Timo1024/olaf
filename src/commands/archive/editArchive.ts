import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { developer } from "../../lib/generalLib";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { printArchive } from "./archiveLib";
var fs = require("fs");

export const editArchive: Command = {
    name: archive.editArchive.name,
    description: archive.editArchive.description,
    options: [
        {
            name: archive.editArchive.options[0].name,
            description: archive.editArchive.options[0].description,
            type: "INTEGER",
            required: true
        },
        {
            name: archive.editArchive.options[1].name,
            description: archive.editArchive.options[1].description,
            type: "STRING",
            required: true
        },
        {
            name: archive.editArchive.options[2].name,
            description: archive.editArchive.options[2].description,
            type: "STRING",
            required: true
        },
        {
            name: archive.editArchive.options[3].name,
            description: archive.editArchive.options[3].description,
            type: "STRING",
            required: true
        },
        {
            name: archive.editArchive.options[4].name,
            description: archive.editArchive.options[4].description,
            type: "BOOLEAN",
            required: true
        },
        {
            name: archive.editArchive.options[5].name,
            description: archive.editArchive.options[5].description,
            type: "USER",
            required: false
        }
    ],
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {

        // checking if the user who used the command is a developer
        if(await developer(interaction)){

            let readStream = fs.createReadStream("src/data/archive/main.archive", 'utf8');

            let archiveChunk : string;

            readStream.on('data', async function(chunk : string){
                archiveChunk = chunk;
            
                // getting all options of the command
                const number     : string = (interaction.options.get(archive.editArchive.options[0].name)?.value as number).toString();
                const content    : string = interaction.options.get(archive.editArchive.options[1].name)?.value as string;
                const person     : string = interaction.options.get(archive.editArchive.options[2].name)?.value as string;
                const date       : string = interaction.options.get(archive.editArchive.options[3].name)?.value as string;
                const quizz      : string = (interaction.options.get(archive.editArchive.options[4].name)?.value)?.toString() as string;
                let userID       : string;
                if(interaction.options.getUser(archive.editArchive.options[5].name)){
                    userID = (interaction.options.getUser(archive.editArchive.options[5].name)?.id)?.toString() as string;
                } else {
                    userID = "undefined";
                }

                // searching in the archive for the number given
                let archiveSplitted : string[] = archiveChunk.split("\n");
                let newArchiveSplitted : string[] = [];
                let foundQuote : boolean = false;
                archiveSplitted.forEach((line : string) => {
                    if(line.startsWith(number + "|")){
                        line = number + "|" + content + "|" + person + "|" + date + "|" + quizz + "|" + userID;
                        foundQuote = true;
                    }
                    newArchiveSplitted.push(line)
                });

                if(foundQuote){

                    // generating new file
                    let newArchive : string = newArchiveSplitted.join("\n");
        
                    const response : MessageEmbed = printArchive(number, content, person, date);
                    await interaction.followUp({embeds: [ response ]});

                    fs.writeFile("src/data/archive/main.archive", newArchive, async (err : Error) => {
                        if (err) {
                        console.error(err);
                        }
                    });

                } else {
                    let lastNumber : string = archiveSplitted.pop()?.split("|")[0] as string;
                    
                    await interaction.followUp({ 
                        content: 'Didn\'t fing the quote. For the number of the quote use a number between 1 and ' + lastNumber, 
                        ephemeral: true 
                    })
                }
            });
        } else {
            // if user is not a developer
            await interaction.followUp({ 
                content: 'you don\'t have permission to use this command. If you want to edit this quote contact a user with vip rank', 
                ephemeral: true 
            });
        }
    }
};