import { MessageActionRow, MessageButton, BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../../Command";
import { archive } from "../../parameters/commands.json";

export const quizzArchive: Command = {
    name: archive.quizz.play.name,
    description: archive.quizz.play.description,
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        const content : string = "Hier steht ein Zitat";

        const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('robin')
					.setLabel('Robin')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('cici')
					.setLabel('Cici')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('gizi')
					.setLabel('Gizi')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('simon')
					.setLabel('Simon')
					.setStyle('SECONDARY')
			);

        const row2 = new MessageActionRow()
			.addComponents(
                new MessageButton()
					.setCustomId('jojo')
					.setLabel('Jojo')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('stefan')
					.setLabel('Stefan')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('adrian')
					.setLabel('Adrian')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('other')
					.setLabel('Other')
					.setStyle('SECONDARY')
			);

        await interaction.followUp({
            ephemeral: true,
            content: content,
            components: [row1, row2]
        });
    }
}; 