import { Message } from "discord.js";

export function addMessageXPToUser(message : Message){

    console.log("length of message: " + message.content.length);
    console.log("user id: " + message.author.id);
    

    // TODO calculate xp
    // TODO add xp to user in database

}