import { CommandInteraction, Client, GuildMember, EmbedBuilder } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { guild_id } from "../../parameters/server.json";
var fs = require("fs");

export const quizzLeaderboardArchive: Command = {
    name: archive.quizz.leaderboard.name,
    description: archive.quizz.leaderboard.description,
    options: [
        {
            name: archive.quizz.leaderboard.options[0].name,
            description: archive.quizz.leaderboard.options[0].description,
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: archive.quizz.leaderboard.options[0].choices[0].name,
                    value: archive.quizz.leaderboard.options[0].choices[0].value
                },
                {
                    name: archive.quizz.leaderboard.options[0].choices[1].name,
                    value: archive.quizz.leaderboard.options[0].choices[1].value
                }
            ]
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        const path : string = "src/data/archive/main.scores";

        if(fs.existsSync(path)){

            let readStream = fs.createReadStream(path, 'utf8');

            let quizzChunk : string;

            readStream.on('data', async function(chunk : string){
                quizzChunk = chunk;
            
                // getting all options of the command
                const type : string = interaction.options.get(archive.quizz.leaderboard.options[0].name)?.value as string;

                // getting the values from the quizz file
                let quizzSplitted : string[] = quizzChunk.split("\n");
                let quizzValues : [string, number, number, string][] = [];

                quizzSplitted.forEach((line : string) => {

                    line = line.trim()

                    let lineSplitted : string[] = line.split("|");
                    let userID : string = lineSplitted[0];
                    let correctAbsolute : number = parseInt(lineSplitted[1]);
                    let incorrectAbsolute : number = parseInt(lineSplitted[2]);
                    let name : string = lineSplitted[3];

                    let correct : number;
                    let incorrect : number;

                    if(type == "relative"){
                        correct   = ((correctAbsolute   / (correctAbsolute+incorrectAbsolute)) * 100);
                        incorrect = ((incorrectAbsolute / (correctAbsolute+incorrectAbsolute)) * 100);
                    } else {
                        correct = correctAbsolute;
                        incorrect = incorrectAbsolute;
                    }

                    quizzValues.push([
                        userID, 
                        correct,
                        incorrect,
                        name
                    ]);                    
                });

                // sort the array
                quizzValues.sort((a, b) => {
                    if(a[1]-b[1] < 1){
                        return 1
                    } 
                    if (a[1]-b[1] > 1){
                        return -1
                    }
                    return 0;
                });

                let embedHeading : string;
                let embedContentAddition : string;
                if(type == "relative"){
                    embedHeading = "🏆 Archive Quizz Leaderboard (relative) 🏆";
                    embedContentAddition = "% of the time";
                } else {
                    embedHeading = "🏆 Archive Quizz Leaderboard (absolute) 🏆";
                    embedContentAddition = " times";
                }

                const response : EmbedBuilder = new EmbedBuilder()
                    .setColor("#f6cc63")
                    .setTitle(embedHeading)

                let counter : number = 1;
                quizzValues.forEach((line : [string, number, number, string]) => {

                    response.addFields([{
                        name: '\u200b',
                        value: counter.toString() + ". " + line[3] + " answered " + line[1].toFixed(0) + embedContentAddition + " correct"
                    }]);

                    counter++;
                });

                await interaction.reply({embeds: [response]});

            });
        } else {
            await interaction.reply({ 
                content: 'There are no scores yet', 
                ephemeral: true 
            });
        }
    }
};