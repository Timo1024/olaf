import { CommandInteraction, Client, GuildMember, EmbedBuilder } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { makeDescription } from "../../lib/generalLib";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { guild_id } from "../../parameters/server.json";
import { DatabasesArchiveQuizz } from "./../../bot";
import { ArchiveQuizz } from "./../../parameters/databases.json"
import { Model } from "sequelize";

export const quizzLeaderboardArchive: Command = {
    name: archive.quizz.leaderboard.name,
    description: makeDescription(archive.quizz.leaderboard),
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

        const Table = DatabasesArchiveQuizz.filter(x => x.name === interaction.guild?.id + ArchiveQuizz.suffix)[0];
        const users : Model<any, any>[] = await Table.findAll();
            
        // getting all options of the command
        const type : string = interaction.options.get(archive.quizz.leaderboard.options[0].name)?.value as string;

        let quizzValues : [string, number, number, string][] = [];

        users.forEach(user => {
            let userID              : string = user.get("userID")    as string;
            let correctAbsolute     : number = user.get("correct")   as number;
            let incorrectAbsolute   : number = user.get("incorrect") as number;
            let name                : string = user.get("username")  as string;
    
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
    }
};