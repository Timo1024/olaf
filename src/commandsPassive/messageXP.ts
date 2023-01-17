import { Message, Client } from "discord.js";
import { Databases } from "../bot";

export async function addMessageXPToUser(message : Message, client : Client){

    console.log("length of message: " + message.content.length);
    console.log("user id: " + message.author.id);

    if(message.guild){
        console.log("guildID: " + message.guild.id);
    
        try {
            // getting the right table from database

            const Table = Databases.filter(x => x.name === message.guild?.id)[0];            

            const user = await Table.create({
                userID: message.author.id
            });
            
        }
        catch (error) {
            console.log('Something went wrong with adding a user.');
        }

        // adding the new xp amount

        const Table = Databases.filter(x => x.name === message.guild?.id)[0];
        const user = await Table.findOne({ where: { userID: message.author.id } });

        if (user) {
            
            // calculate the xp which the uder gets
            const xpAmount = 5 + Math.min(message.content.length/5, 5);

            // increasing xp in database
            user.increment('xp', { by: xpAmount });

            console.log("updated user xp");
            
        } else {
            console.log("Couldnt find user in database");
        }
    }

}