import { CommandInteraction, Client, EmbedBuilder, GuildMember } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { developer, makeDescription } from "../../lib/generalLib";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { printArchive } from "./archiveLib";
var fs = require("fs");

export const editArchive: Command = {
    name: archive.editArchive.name,
    description: makeDescription(archive.editArchive),
    options: [
        {
            name: archive.editArchive.options[0].name,
            description: archive.editArchive.options[0].description,
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: archive.editArchive.options[1].name,
            description: archive.editArchive.options[1].description,
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: archive.editArchive.options[2].name,
            description: archive.editArchive.options[2].description,
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: archive.editArchive.options[3].name,
            description: archive.editArchive.options[3].description,
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: archive.editArchive.options[4].name,
            description: archive.editArchive.options[4].description,
            type: ApplicationCommandOptionType.Boolean,
            required: true
        },
        {
            name: archive.editArchive.options[5].name,
            description: archive.editArchive.options[5].description,
            type: ApplicationCommandOptionType.User,
            required: false
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
                    const content    : string = interaction.options.get(archive.editArchive.options[1].name)?.value as string;
                    const person     : string = interaction.options.get(archive.editArchive.options[2].name)?.value as string;
                    const date       : string = interaction.options.get(archive.editArchive.options[3].name)?.value as string;
                    const quizz      : string = (interaction.options.get(archive.editArchive.options[4].name)?.value)?.toString() as string;
                    let userID       : string;
                    if(interaction.options.get(archive.makeArchive.options[4].name)){
                        const taggedMember : GuildMember | null = interaction.options.get(archive.makeArchive.options[4].name) as GuildMember | null;
                        if(taggedMember){
                            userID = (taggedMember.user.id).toString() as string;
                        } else {
                            userID = "undefined";
                        }
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
            
                        const response : EmbedBuilder = printArchive(number, content, person, date);
                        await interaction.reply({embeds: [ response ]});

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
                        });
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