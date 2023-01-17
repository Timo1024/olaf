import { CommandInteraction, Client, Interaction, Events, Message } from "discord.js";
import { Commands } from "../Commands";
import { addMessageXPToUser } from "../commandsPassive/messageXP";

export default (client: Client): void => {

    client.on(Events.MessageCreate, async (message: Message) => {
        
        await handleMessage(client, message);

    });

};

const handleMessage = async (client: Client, message: Message): Promise<void> => {
    
    if (!message.author.bot) {
        addMessageXPToUser(message);
    }

};