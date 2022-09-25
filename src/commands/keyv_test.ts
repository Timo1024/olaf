import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { keyv } from "../parameters/commands.json";
var fs = require("fs");

// TODO make dev command only
export const Keyv_test: Command = {
    name: keyv.name,
    description: keyv.description,
    options: [
        {
            name: keyv.options[0].name,
            description: keyv.options[0].description,
            type: "STRING",
            required: true
        },
        {
            name: keyv.options[1].name,
            description: keyv.options[1].description,
            type: "STRING",
            required: true
        },
        {
            name: keyv.options[2].name,
            description: keyv.options[2].description,
            type: "STRING",
            required: true
        },
        {
            name: keyv.options[3].name,
            description: keyv.options[3].description,
            type: "BOOLEAN",
            required: true
        },
        {
            name: keyv.options[4].name,
            description: keyv.options[4].description,
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

        var readStream = fs.createReadStream("src/data/archive.archive", 'utf8');

        var archive : string;

        readStream.on('data', async function(chunk : string){
            archive = chunk;

            let index = archive.lastIndexOf("\n");
            const number : string = archive.slice(index++).split("|")[0]

            let newArchiveLine : string = "";

            newArchiveLine += "\n";
            newArchiveLine += (parseInt(number)+1).toString();
            newArchiveLine += "|";
            newArchiveLine += interaction.options.get(keyv.options[0].name)?.value as string;
            newArchiveLine += "|- ";
            newArchiveLine += interaction.options.get(keyv.options[1].name)?.value as string;
            newArchiveLine += " ";
            newArchiveLine += interaction.options.get(keyv.options[2].name)?.value as string;
            newArchiveLine += "|";
            newArchiveLine += (interaction.options.get(keyv.options[3].name)?.value)?.toString();
            newArchiveLine += "|";
            if(interaction.options.getUser(keyv.options[4].name)){
                newArchiveLine += (interaction.options.getUser(keyv.options[4].name)?.id)?.toString();
            } else {
                newArchiveLine += "undefined";
            }

            archive += newArchiveLine;

            fs.writeFile("src/data/archive.archive", archive, async (err : Error) => {
                if (err) {
                  console.error(err);
                }

                const content = newArchiveLine.slice(1)
    
                await interaction.followUp({
                    ephemeral: true,
                    content
                });

            });

        });
        
    }
}; 