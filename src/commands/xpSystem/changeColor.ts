import { CommandInteraction, Client, Guild, GuildMember, EmbedBuilder, User, BufferResolvable, AttachmentBuilder } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { xp } from "../../parameters/commands.json";
import { makeDescription } from "../../lib/generalLib";
import * as fs from "fs";
import { Databases } from "../../bot";

export const UpdateColor: Command = {
    name: xp.updateColor.name,
    description: makeDescription(xp.updateColor),
    options: [
        {
            name: xp.updateColor.options[0].name,
            description: xp.updateColor.options[0].description,
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
        const hexcode = interaction.options.get(xp.updateColor.options[0].name)?.value as string;

        if(hexcodeCorrect(hexcode)){

            // find user in Database
            const Table = Databases.filter(x => x.name === interaction.guild?.id)[0];
            // const User  = await Table.findOne({ where: { userID: interaction.user.id } });

            const affectedRows = await Table.update({ accentColor: hexcode }, { where: { userID: interaction.user.id } });

            await interaction.reply(
                "Your accent color was updated."
            );
        } else {
            await interaction.reply(
                "You have to write down a hex color code like #111111"
            );
        }
    }
};

function hexcodeCorrect(code : string) : boolean {
    
    if(code.length !== 7) return false;

    if(code[0] !== "#") return false;
    
    for (let i = 1; i < 7; i++) {
        if(![
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
            "a", "b", "c", "d", "e", "f", 
            "A", "B", "C", "D", "E", "F"
        ].includes(code[i])) return false;
    }

    return true;

}

