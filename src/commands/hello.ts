import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { hello } from "../parameters/commands.json"

export const Hello: Command = {
    name: hello.name,
    description: hello.description,
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        const content = "Moin, werde grade wiederbelebt... und bin jetzt über einen externen Server online";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}; 