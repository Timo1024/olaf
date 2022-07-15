import { BaseCommandInteraction, Client, Interaction, MessageContextMenuInteraction, UserContextMenuInteraction } from "discord.js";
import { Commands } from "../Commands";
// import { UICommands } from "../Commands";

export default (client: Client): void => {

    client.on("interactionCreate", async (interaction: Interaction) => {
        // console.log(interaction)
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }
        // if(interaction.isApplicationCommand()){
        //     await handleMessageCommand(client, interaction);
        // }

    });

};

// const handleMessageCommand = async (client: Client, interaction: MessageContextMenuInteraction): Promise<void> => {
//     const uiMessageCommand = UICommands.find(c => c.name === interaction.commandName);

//     if (!uiMessageCommand) {
//         interaction.followUp({ content: "An error has occurred" });
//         return;
//     }

//     await interaction.deferReply();

    
// }

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    console.log(interaction.type)
    // if(interaction.isMessageContextMenu()){
    //     const uiMessageCommand = UICommands.find(c => c.name === interaction.commandName);
        
    //     if (!uiMessageCommand) {
    //         interaction.followUp({ content: "An error has occurred" });
    //         return;
    //     }

    //     await interaction.deferReply();

    //     uiMessageCommand.run(client, interaction);

    // } else {
        
        const slashCommand = Commands.find(c => c.name === interaction.commandName);
        
        if (!slashCommand) {
            interaction.followUp({ content: "An error has occurred" });
            return;
        }
    
        await interaction.deferReply();
        
        slashCommand.run(client, interaction);

    // }


};