import { CommandInteraction, Client, Guild, GuildMember, EmbedBuilder, User, BufferResolvable, AttachmentBuilder } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { xp } from "../../parameters/commands.json";
import { makeDescription } from "../../lib/generalLib";
import * as fs from "fs";
import { DatabasesXP } from "../../bot";
import { XP } from "./../../parameters/databases.json"

export const UpdateBanner: Command = {
    name: xp.updateBanner.name,
    description: makeDescription(xp.updateBanner),
    options: [
        {
            name: xp.updateBanner.options[0].name,
            description: xp.updateBanner.options[0].description,
            type: ApplicationCommandOptionType.Attachment,
            required: false
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
        const banner = interaction.options.get(xp.updateBanner.options[0].name)
        console.log(banner?.attachment?.attachment);

        if(banner){

            const url : string | undefined = banner?.attachment?.url;

            if(url){

                // find user in Database
                const Table = DatabasesXP.filter((x: { name: string; }) => x.name === interaction.guild?.id + XP.suffix)[0];

                const affectedRows = await Table.update({ imageLink: url }, { where: { userID: interaction.user.id } });

                await interaction.reply(
                    "Your new background was uploaded."
                );
            } else {
                await interaction.reply(
                    "Your new background could't be uploaded."
                );
            }
        } else {

            // find user in Database
            const Table = DatabasesXP.filter((x: { name: string; }) => x.name === interaction.guild?.id + XP.suffix)[0];

            const affectedRows = await Table.update({ imageLink: null }, { where: { userID: interaction.user.id } });

            await interaction.reply(
                "Your background was removed"
            );

        }
        

    }
};

