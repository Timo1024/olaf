import { Message, Client } from "discord.js";
import { DatabasesXP } from "../bot";
import { XP } from "./../parameters/databases.json"

// calculates how much xp a user gets for a written message and 
// adds it to the xp Amount of this user
export async function addMessageXPToUser(message : Message, client : Client){

    if(message.guild && !message.author.bot){

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
        const Table = DatabasesXP.filter(x => x.name === guildID + XP.suffix)[0];            

        const user = await Table.create({
            userID: userID
        });
        
    }
    catch (error) {
        
    }

    // adding the xp
    const Table = DatabasesXP.filter(x => x.name === guildID + XP.suffix)[0];
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
    const Table = DatabasesXP.filter(x => x.name === guildID + XP.suffix)[0];
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
            console.log("added " + newTokens + " Token(s) to the user b/c of level up");
            
            

        }

    } else {
        console.log("didn't fint user in database");
    }

}

export async function updateTokens(guildID: string, userID: string, amount : number) : Promise<void> {
    
    // getting the user
    const Table = DatabasesXP.filter(x => x.name === guildID + XP.suffix)[0];
    const user = await Table.findOne({ where: { userID: userID } });

    if(user){

        // check that tokens can't go below 0
        const tokens   : number = user.get("tokens") as number;
        if(tokens + amount >= 0){
            user.increment("tokens", { by: amount });
    
            console.log("updated tokens b/c of command usage");
        } else {
            console.log("user doesn't have enough tokens");
        }

    } else {
        console.log("didn't fint user in database");
    }

}

export async function checkIfEnoughTokens(guildID: string, userID: string, amountToRemove : number) : Promise<boolean> {

    // getting the user
    const Table = DatabasesXP.filter(x => x.name === guildID + XP.suffix)[0];
    const user = await Table.findOne({ where: { userID: userID } });

    if(user){

        // check that tokens can't go below 0
        const tokens   : number = user.get("tokens") as number;
        if(tokens - amountToRemove >= 0){    
            return true;
        } else {
            console.log("user doesn't have enough tokens");
            return false;
        }

    } else {
        console.log("didn't fint user in database");
        return false;
    }
}



