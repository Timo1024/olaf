import { CommandInteraction, Client, Guild, GuildMember, EmbedBuilder, User, BufferResolvable, AttachmentBuilder } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { xp } from "../../parameters/commands.json";
import { makeDescription } from "../../lib/generalLib";
import * as fs from "fs";
import { Databases } from "../../bot";

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
        console.log(banner?.attachment?.url);

        if(banner){

            // const buffer : BufferResolvable | undefined = question?.attachment?.attachment as BufferResolvable | undefined;
            const url : string | undefined = banner?.attachment?.url;

            if(url){

                // console.log(buffer);
                
                // var displayImage = new Image();
                // displayImage.src = url;
                // const file = new AttachmentBuilder(buffer);
                // fs.writeFileSync("src/commands/xpSystem/userImages/" + interaction.user.id + ".jpg", buffer);
                // const response = await fetch(url);
                // const blob = await response.blob();
                // const arrayBuffer = await blob.arrayBuffer();
                // const buffer = Buffer.from(arrayBuffer);

                // find user in Database
                const Table = Databases.filter(x => x.name === interaction.guild?.id)[0];

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
            const Table = Databases.filter(x => x.name === interaction.guild?.id)[0];

            const affectedRows = await Table.update({ imageLink: null }, { where: { userID: interaction.user.id } });

            await interaction.reply(
                "Your background was removed"
            );

        }
        

    }
};

