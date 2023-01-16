import { CommandInteraction, Client } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { database } from "../../parameters/commands.json";
import { Sequelize, DataTypes } from "sequelize";
import { Tags } from "../../bot";

// TODO make dev command only
export const AddTag: Command = {
    name: database.add.name,
    description: database.add.description,
    options: [
        {
            name: database.add.options[0].name,
            description: database.add.options[0].description,
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: database.add.options[1].name,
            description: database.add.options[1].description,
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
        const tagName = interaction.options.get(database.add.options[0].name)?.value as string
        const tagDescription = interaction.options.get(database.add.options[1].name)?.value as string

        try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Tags.create({
				name: tagName,
				description: tagDescription,
				username: interaction.user.username,
			});

            console.log(tag)
			return interaction.reply(`Tag ${tag.dataValues.name} added.`);
		}
		catch (error) {
			// if (error.name === 'SequelizeUniqueConstraintError') {
			// 	return interaction.reply('That tag already exists.');
			// }

			return interaction.reply('Something went wrong with adding a tag.');
		}

        // const content : string = "added Tag";

        // await interaction.reply({
        //     ephemeral: true,
        //     content
        // });
    }
};