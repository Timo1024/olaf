import { Message, Client } from "discord.js";
import { Databases } from "../bot";

// calculates how much xp a user gets for a written message and 
// adds it to the xp Amount of this user
export async function addMessageXPToUser(message : Message, client : Client){

    if(message.guild){

        // calculate the xp which the uder gets
        const xpAmount = 5 + Math.min(message.content.length/5, 5);
        addXPToUser(message.guild.id, message.author.id, xpAmount);
    }

}

// adds xp to user in the given guild and for the given user
export async function addXPToUser(guildID: string, userID: string, xpAmount: number) : Promise<void> {

    // adding user if user is not in database yet
    try {
        // getting the right table from database
        const Table = Databases.filter(x => x.name === guildID)[0];            

        const user = await Table.create({
            userID: userID
        });
        
    }
    catch (error) {
        
    }

    // adding the xp
    const Table = Databases.filter(x => x.name === guildID)[0];
    const user = await Table.findOne({ where: { userID: userID } });

    if (user) {

        // increasing xp in database
        user.increment('xp', { by: xpAmount });
        console.log("updated user xp");

        // updating lvl and tokens
        updateLevelAndTokens(guildID, userID)

        
    } else {
        console.log("Couldnt find user in database");
    }
}

// updates the token amount and the level when getting xp
export async function updateLevelAndTokens(guildID: string, userID: string) {
    
    // getting the xp amount and the current level of the user
    const Table = Databases.filter(x => x.name === guildID)[0];
    const user = await Table.findOne({ where: { userID: userID } });

    if(user){

        const xp       : number = user.get("xp")     as number;
        const tokens   : number = user.get("tokens") as number;
        const oldLevel : number = user.get("level")  as number;

        // calculate the new level
        const newLevel : number = Math.ceil(Math.sqrt(0.1 * xp));

        // add tokens if new level and change level
        if(newLevel > oldLevel){

            user.increment("level", { by: 1 });
            const newTokens : number = Math.ceil(newLevel);
            user.increment("tokens", { by: newTokens });

            console.log("user levelled up");
            console.log("added " + newTokens + " Token(s) to the user");
            
            

        }

    } else {
        console.log("didn't fint user in database");
    }

}



