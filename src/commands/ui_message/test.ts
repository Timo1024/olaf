import { BaseCommandInteraction, Client } from "discord.js";
import { UICommand } from "../../Command";
// import { hello } from "../../parameters/commands.json"

// TODO make dev command only
export const Test: UICommand = {
    name: "test",
    type: "MESSAGE",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        const content : string = "Moin, werde grade wiederbelebt... und bin jetzt über einen externen Server online";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}; 