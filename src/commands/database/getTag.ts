import { CommandInteraction, Client } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { database } from "../../parameters/commands.json";
import { Sequelize, DataTypes } from "sequelize";
import { Tags } from "../../bot";

// TODO make dev command only
export const ViewTag: Command = {
    name: database.view.name,
    description: database.view.description,
    options: [
        {
            name: database.view.options[0].name,
            description: database.view.options[0].description,
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
        const tagID = interaction.options.get(database.view.options[0].name)?.value as string

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
	    const tag = await Tags.findOne({ where: { id: tagID } });

        if (tag) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
            tag.increment('usage_count');
    
            // return interaction.reply(tag.get('description'));
            return interaction.reply(tag.dataValues.name + ": " + tag.dataValues.description);
        }
    
        return interaction.reply(`Could not find tag with id: ${tagID}`);

        // const content : string = "added Tag";

        // await interaction.reply({
        //     ephemeral: true,
        //     content
        // });
    }
};