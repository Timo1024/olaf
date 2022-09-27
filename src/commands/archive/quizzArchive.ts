import { MessageActionRow, MessageButton, BaseCommandInteraction, Client, Interaction, MessageComponentInteraction, MessageEmbed, ColorResolvable } from "discord.js";
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
                    });

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
    console.log(interaction.customId)
    if(interaction.customId.startsWith("true")){
        color = "#40ff00";
    } else {
        color = "#ff3600";
    }

    const response : MessageEmbed = printArchive(number, content, user, date, color);
    await interaction.update({ components: [], embeds: [response] })

}