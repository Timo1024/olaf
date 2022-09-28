import { MessageActionRow, MessageButton, BaseCommandInteraction, Client, Interaction, MessageComponentInteraction, MessageEmbed, ColorResolvable, InteractionCollector } from "discord.js";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
import { printArchive } from "./archiveLib";
var fs = require("fs");

export const quizzArchive: Command = {
    name: archive.quizz.play.name,
    description: archive.quizz.play.description,
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        // const content : string = "Hier steht ein Zitat";

        const path : string = "src/data/archive/main.archive";

        if(fs.existsSync(path)){

            let readStream = fs.createReadStream(path, 'utf8');
            
            let archiveChunk : string;
            
            readStream.on('data', async function(chunk : string){
                
                archiveChunk = chunk;

                let archiveSplitted : string[] = archiveChunk.split("\n");

                // just get quotes which can be used in the quizz
                archiveSplitted = archiveSplitted.filter(x => x.includes("|true|"));

                // get random line
                const randomInt : number = Math.floor(Math.random() * archiveSplitted.length);
                const quote : string = archiveSplitted[randomInt];

                if(quote != undefined){
                    
                    const infos : string[] = quote.split("|");
                    const number  : string = infos[0];
                    const content : string = infos[1];
                    const person  : string = infos[2];
                    const date    : string = infos[3];
                    const userID  : string = infos[5];

                    
                    const response : MessageEmbed = printArchive(number, content, "???", date, "#ffcc00");
                    
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
                    
                    const row1 = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId(robin + "|robin|" + interaction.user.id)
                                .setLabel('Robin')
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId(cici + "|cici|" + interaction.user.id)
                                .setLabel('Cici')
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId(gizi + "|gizi|" + interaction.user.id)
                                .setLabel('Gizi')
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId(simon + "|simon|" + interaction.user.id)
                                .setLabel('Simon')
                                .setStyle('SECONDARY')
                        );
        
                    const row2 = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId(jojo + "|jojo|" + interaction.user.id)
                                .setLabel('Jojo')
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId(stefan + "|stefan|" + interaction.user.id)
                                .setLabel('Stefan')
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId(adrian + "|adrian|" + interaction.user.id)
                                .setLabel('Adrian')
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId(other + "|other|" + interaction.user.id)
                                .setLabel('Other')
                                .setStyle('SECONDARY')
                        );
        
                    await interaction.reply({
                        ephemeral: false,
                        embeds: [response],
                        components: [row1, row2]
                    }).then(() => {
                        client.on("interactionCreate", async (interactionButton: Interaction) => {
    
                            if(!interactionButton.isButton()) return;
                            
                            if (!interactionButton.customId.endsWith(interactionButton.user.id)) {
                                return interactionButton.reply({
                                content: "This button is not for you",
                                ephemeral: true
                                })
                            } else {
                                await handleButton(client, interactionButton, number, content, person, date);
                            }
                    
                        });
                    })

                } else {
                    await interaction.reply({ 
                        content: 'Didn\'t find the quote', 
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
    }
};

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

    const response : MessageEmbed = printArchive(number, content, user, date, color);
    try {
        await interaction.update({ components: [], embeds: [response] }).then(async () => {

            const path : string = "src/data/archive/main.scores";

            if(fs.existsSync(path)){

                let readStream = fs.createReadStream(path, 'utf8');

                let quizzChunk : string;

                readStream.on('data', async function(chunk : string){
                    quizzChunk = chunk;
                
                    let userID : string = interaction.user.id;

                    // searching in the scores for the number given
                    let quizzSplitted : string[] = quizzChunk.split("\n");
                    let newQuizzSplitted : string[] = [];
                    let foundScore : boolean = false;
                    quizzSplitted.forEach((line : string) => {
                        if(line.startsWith(userID + "|")){
                            let lineSplitted : string[] = line.split("|");
                            if(correct){
                                lineSplitted[1] = (parseInt(lineSplitted[1])+1).toString();
                            } else {
                                lineSplitted[2] = (parseInt(lineSplitted[2])+1).toString();
                            }
                            line = lineSplitted.join("|");
                            foundScore = true;
                        }
                        newQuizzSplitted.push(line)
                    });

                    if(foundScore){

                        // generating new file
                        let newQuizz : string = newQuizzSplitted.join("\n");

                        fs.writeFile(path, newQuizz, async (err : Error) => {
                            if (err) {
                                console.error(err);
                            }
                        });

                    } else {
                        
                        let line : string;
                        if(correct){
                            line = userID + "|1|0";
                        } else {
                            line = userID + "|0|1";
                        }

                        fs.writeFile(path, quizzChunk + "\n" + line, async (err : Error) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                        
                    }
                });
            } else {

                let userID : string = interaction.user.id;
                let line : string;
                if(correct){
                    line = userID + "|1|0";
                } else {
                    line = userID + "|0|1";
                }

                fs.writeFile(path, line, async (err : Error) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }

        })
    } catch (err) {
        // FIXME this error should't appear
        console.log("Interaction has already been acknowledged");
    }
}