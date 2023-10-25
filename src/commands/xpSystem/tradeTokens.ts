import { CommandInteraction, Client, User } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { xp } from "../../parameters/commands.json"
import { makeDescription } from "../../lib/generalLib";
import { Databases } from "../../bot";

// TODO make dev command only
export const TradeTokens: Command = {
    name: xp.tradeTokens.name,
    description: makeDescription(xp.tradeTokens),
    options: [
        {
            name: xp.tradeTokens.options[0].name,
            description: xp.tradeTokens.options[0].description,
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: xp.tradeTokens.options[1].name,
            description: xp.tradeTokens.options[1].description,
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        // get user and amount
        const amount : number    = interaction.options.get(xp.tradeTokens.options[0].name)?.value as number;
        const tagged_user : User | undefined = interaction.options.get(xp.getXPOverview.options[0].name)?.user;
        const fromUserID : string = interaction.user.id;
        const toUserID   : string | undefined = tagged_user?.id;
        
        // find user in Database
        const Table = Databases.filter(x => x.name === interaction.guild?.id)[0];
        const fromUser = await Table.findOne({ where: { userID: fromUserID } });
        const toUser   = await Table.findOne({ where: { userID: toUserID   } });

        if(toUser && fromUser) {
            if(amount > 0){
                if(fromUserID !== toUserID){
                    const tokens   : number = fromUser.get("tokens") as number;
        
                    if(tokens >= amount){
        
                        fromUser.increment('tokens', { by: -amount });
                        toUser.increment('tokens', { by: amount });
                
                        await interaction.reply("You succefully transferred " + amount + " Tokens");
        
                    } else {
                        await interaction.reply("You don't have this amount of tokens!");
                    }
                } else {
                    await interaction.reply("You can't trade with yourself");
                }
            } else {
                await interaction.reply("You need to trade at least 1 token");
            }
            
        } else {
            await interaction.reply("you or the user you mentioned never wrote before");
            console.log("didn't find the user");
        }
    }
}; 