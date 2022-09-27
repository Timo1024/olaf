import { BaseCommandInteraction, Client, Message, MessageEmbed, User } from "discord.js";
import { developer } from "../../lib/generalLib";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { printArchive } from "./archiveLib";
var fs = require("fs");

export const addArchive: Command = {
    name: archive.makeArchive.name,
    description: archive.makeArchive.description,
    options: [
        {
            name: archive.makeArchive.options[0].name,
            description: archive.makeArchive.options[0].description,
            type: "STRING",
            required: true
        },
        {
            name: archive.makeArchive.options[1].name,
            description: archive.makeArchive.options[1].description,
            type: "STRING",
            required: true
        },
        {
            name: archive.makeArchive.options[2].name,
            description: archive.makeArchive.options[2].description,
            type: "STRING",
            required: true
        },
        {
            name: archive.makeArchive.options[3].name,
            description: archive.makeArchive.options[3].description,
            type: "BOOLEAN",
            required: true
        },
        {
            name: archive.makeArchive.options[4].name,
            description: archive.makeArchive.options[4].description,
            type: "USER",
            required: false
        }
    ],
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        // fs.readFile("src/data/archive.archive", async function(err : Error, buf : any) {
        //     if (err) { console.log(err) }
            
        //     console.log(buf.toString())
        // })

        // checking if the user who used the command is a developer
        if(await developer(interaction)){

            var readStream = fs.createReadStream("src/data/archive/main.archive", 'utf8');
    
            var archiveChunk : string;
    
            readStream.on('data', async function(chunk : string){
                archiveChunk = chunk;
    
                let lastLine : string = archiveChunk.split("\n").slice(-1)[0];
                const number : string = lastLine.split("|")[0];
    
                let newArchiveLine : string = "";
                const nextNumber : string = (parseInt(number)+1).toString();
                const content    : string = interaction.options.get(archive.makeArchive.options[0].name)?.value as string;
                const person     : string = interaction.options.get(archive.makeArchive.options[1].name)?.value as string;
                const date       : string = interaction.options.get(archive.makeArchive.options[2].name)?.value as string;
                const quizz      : string = (interaction.options.get(archive.makeArchive.options[3].name)?.value)?.toString() as string;
                let userID : string;
                if(interaction.options.getUser(archive.makeArchive.options[4].name)){
                    userID = (interaction.options.getUser(archive.makeArchive.options[4].name)?.id)?.toString() as string;
                } else {
                    userID = "undefined";
                }
    
                newArchiveLine += "\n";
                newArchiveLine += nextNumber;
                newArchiveLine += "|";
                newArchiveLine += content;
                newArchiveLine += "|";
                newArchiveLine += person;
                newArchiveLine += "|";
                newArchiveLine += date;
                newArchiveLine += "|";
                newArchiveLine += quizz;
                newArchiveLine += "|";
                newArchiveLine += userID;
    
                archiveChunk += newArchiveLine;
    
                const response : MessageEmbed = printArchive(number, content, person, date);
                await interaction.followUp({embeds: [ response ]});
    
                fs.writeFile("src/data/archive/main.archive", archiveChunk, async (err : Error) => {
                    if (err) {
                      console.error(err);
                    }
                });
            });

        } else {
            // if user is not a developer
            await interaction.followUp({ 
                content: 'you don\'t have permission to use this command. If you want to add a quote contact a user with vip rank', 
                ephemeral: true 
            });
        }

    }
};