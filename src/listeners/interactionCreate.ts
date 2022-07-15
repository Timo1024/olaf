import { BaseCommandInteraction, Client, Interaction } from "discord.js";
import { Commands, UICommands } from "../Commands";

export default (client: Client): void => {

    client.on("interactionCreate", async (interaction: Interaction) => {

        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }

    });

};

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    const uiMessageCommand = UICommands.find(c => c.name === interaction.commandName);
    
    // if (!slashCommand && !uiMessageCommand) {
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();
    
    // if(slashCommand){
    slashCommand.run(client, interaction);
    // }
    // else if(uiMessageCommand){
    //     uiMessageCommand.run(client, interaction);
    // }
    // else {
    //     interaction.followUp({ content: "An error has occurred" });
    //     return;
    // }

};