import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";
var fs = require("fs");

// TODO make dev command only
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

        var readStream = fs.createReadStream("src/data/archive/main.archive", 'utf8');

        var archiveChunk : string;

        readStream.on('data', async function(chunk : string){
            archiveChunk = chunk;

            let lastLine : string = archiveChunk.split("\n").slice(-1)[0];
            const number : string = lastLine.split("|")[0];

            let newArchiveLine : string = "";

            newArchiveLine += "\n";
            newArchiveLine += (parseInt(number)+1).toString();
            newArchiveLine += "|";
            newArchiveLine += interaction.options.get(archive.makeArchive.options[0].name)?.value as string;
            newArchiveLine += "|";
            newArchiveLine += interaction.options.get(archive.makeArchive.options[1].name)?.value as string;
            newArchiveLine += "|";
            newArchiveLine += interaction.options.get(archive.makeArchive.options[2].name)?.value as string;
            newArchiveLine += "|";
            newArchiveLine += (interaction.options.get(archive.makeArchive.options[3].name)?.value)?.toString();
            newArchiveLine += "|";
            if(interaction.options.getUser(archive.makeArchive.options[4].name)){
                newArchiveLine += (interaction.options.getUser(archive.makeArchive.options[4].name)?.id)?.toString();
            } else {
                newArchiveLine += "undefined";
            }

            archiveChunk += newArchiveLine;

            fs.writeFile("src/data/archive/main.archive", archiveChunk, async (err : Error) => {
                if (err) {
                  console.error(err);
                }

                const content = "Addad _" + newArchiveLine.slice(1) + "_ to the archive"
    
                await interaction.followUp({
                    ephemeral: true,
                    content
                });

            });

        });
        
    }
}; 