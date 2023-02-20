import { randomUUID } from "crypto";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Client, Interaction, MessageComponentInteraction, EmbedBuilder, ColorResolvable, InteractionCollector, GuildMember, Guild, ButtonInteraction } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType, ComponentType } from 'discord.js';
import { makeDescription } from "../../lib/generalLib";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { printArchive } from "./archiveLib";
import { updateTokens } from "../../lib/xpLib";
import { DatabasesArchiveQuizz, DatabasesArchiveQuotes } from "./../../bot";
import { ArchiveQuizz, ArchiveQuotes } from "./../../parameters/databases.json"
import { Model } from "sequelize";

export const quizzArchive: Command = {
    name: archive.quizz.play.name,
    description: makeDescription(archive.quizz.play),
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
        const TableQuotes = DatabasesArchiveQuotes.filter((x: { name: string; }) => x.name === interaction.guild?.id + ArchiveQuotes.suffix)[0];

        // const path : string = "src/data/archive/main.archive";

        // just get quotes which can be used in the quizz
        const ValidQuotes : Model<any, any>[] = await TableQuotes.findAll({
            where : { inQuizz : true }
        });

        // if(fs.existsSync(path)){

            // let readStream = fs.createReadStream(path, 'utf8');
            
            // let archiveChunk : string;
            
            // readStream.on('data', async function(chunk : string){
                
                // archiveChunk = chunk;

                // let archiveSplitted : string[] = archiveChunk.split("\n");

                // just get quotes which can be used in the quizz
                // archiveSplitted = archiveSplitted.filter(x => x.includes("|true|"));

        // get random entry
        const randomInt : number = Math.floor(Math.random() * ValidQuotes.length);
        // const quote : string = ValidQuotes[randomInt];
        const quote : Model<any, any> = ValidQuotes[randomInt];

        if(quote != undefined){
            
            // const infos : string[] = quote.split("|");
            const number  : string = (quote.get("id")       as number).toString();
            const content : string = quote.get("content")   as string;
            const person  : string = quote.get("user")      as string;
            const date    : string = quote.get("date")      as string;
            const userID  : string = quote.get("userQuizz") as string;

            
            const response : EmbedBuilder = printArchive(number, content, "???", date, "#ffcc00");
            
            // calculating which person said the quote
            let robin : string  = "false";
            let cici : string   = "false";
            let gizi : string   = "false";
            let simon : string  = "false";
            let jojo : string   = "false";
            let stefan : string = "false";
            let adrian : string = "false";
            let other : string  = "false";
            
            switch (BigInt(userID)) {
                case 626012070160236546n:
                    robin = "true";
                    break;
                case 488054249381429249n:
                    cici = "true";
                    break;
                case 445113827143450625n:
                    gizi = "true";
                    break;
                case 266246894798372864n:
                    simon = "true";
                    break;
                case 297048673093943306n:
                    jojo = "true";
                    break;
                case 637188899415785473n:
                    stefan = "true";
                    break;
                case 546671859828260874n:
                    adrian = "true";
                    break;
                default:
                    other = "true";
                    break;
            }

            // generate uuid v4
            const uuid : string = randomUUID();
            
            const row1 = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(robin + "|robin|" + uuid + "|" + interaction.user.id)
                        .setLabel('Robin')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(cici + "|cici|" + uuid + "|" + interaction.user.id)
                        .setLabel('Cici')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(gizi + "|gizi|" + uuid + "|" + interaction.user.id)
                        .setLabel('Gizi')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(simon + "|simon|" + uuid + "|" + interaction.user.id)
                        .setLabel('Simon')
                        .setStyle(ButtonStyle.Secondary)
                );

            const row2 = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(jojo + "|jojo|" + uuid + "|" + interaction.user.id)
                        .setLabel('Jojo')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(stefan + "|stefan|" + uuid + "|" + interaction.user.id)
                        .setLabel('Stefan')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(adrian + "|adrian|" + uuid + "|" + interaction.user.id)
                        .setLabel('Adrian')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(other + "|other|" + uuid + "|" + interaction.user.id)
                        .setLabel('Other')
                        .setStyle(ButtonStyle.Secondary)
                );

            await interaction.reply({
                ephemeral: false,
                embeds: [response],
                components: [row1, row2]
            });

            // changed from this
            // const collector = interaction.channel?.createMessageComponentCollector({ componentType: "BUTTON", time: 60000 }) as InteractionCollector<ButtonInteraction>;
            // to this after updating from v13 to v14
            const collector = interaction.channel?.createMessageComponentCollector({ componentType : ComponentType.Button, time: 60000 }) as InteractionCollector<ButtonInteraction>;

            collector.on('collect', async i => {
                if (i.user.id === interaction.user.id) {
                    collector.stop();
                    await handleButton(client, i, number, content, person, date);
                } else {
                    i.reply({ 
                        content: "This button is not for you", 
                        ephemeral: true 
                    });
                }
            });
            
            collector.on('end', collected => {
                collector.stop();
            });

        } else {
            await interaction.reply({ 
                content: 'Didn\'t find the quote', 
                ephemeral: true 
            });
        }

    }
};
            
//         } else {
//             await interaction.reply({ 
//                 content: 'There are no quotes yet', 
//                 ephemeral: true 
//             });
//         }
// };

const handleButton = async (client: Client, interaction: MessageComponentInteraction, number : string, content : string, user : string, date : string) : Promise<void> => {

    // getColor
    let color : ColorResolvable;
    let correct : boolean;
    if(interaction.customId.startsWith("true")){
        color = "#40ff00";
        correct = true;
    } else {
        color = "#ff3600";
        correct = false;
    }

    const response : EmbedBuilder = printArchive(number, content, user, date, color);
    try {
        await interaction.update({ components: [], embeds: [response] }).then(async () => {

            const TableScores = DatabasesArchiveQuizz.filter((x: { name: string; }) => x.name === interaction.guild?.id + ArchiveQuizz.suffix)[0];

            const User : Model<any, any> | null = await TableScores.findOne({
                where : { userID : interaction.user.id }
            });

            let name : string;
            if((interaction.member as GuildMember).nickname != null){
                name = (interaction.member as GuildMember).nickname as string;
            } else {
                name = interaction.user.username;
            }

            if(User){
                if(correct) User.increment("correct");
                else User.increment("incorrect");
            } else {
                const NewUser : Model<any, any> = await TableScores.create({
                    userID: interaction.user.id,
                    username: name,
                });

                if(correct) NewUser.increment("correct");
                else NewUser.increment("incorrect");

            }

        });

        // update tokens when won
        if(correct) updateTokens(interaction.guild?.id as string, interaction.user.id, 1);

    } catch (err) {
        // FIXME this error should't appear
        console.log("Interaction has already been acknowledged");
    }
}