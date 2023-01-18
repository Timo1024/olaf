import { CommandInteraction, Client, User } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { xp } from "../../parameters/commands.json"
import { makeDescription } from "../../lib/generalLib";
import { Databases } from "../../bot";

// TODO make dev command only
export const XPOverview: Command = {
    name: xp.getXPOverview.name,
    description: makeDescription(xp.getXPOverview),
    options: [
        {
            name: xp.getXPOverview.options[0].name,
            description: xp.getXPOverview.options[0].description,
            type: ApplicationCommandOptionType.User
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        // get user
        const tagged_user : User | null = interaction.options.getUser(xp.getXPOverview.options[0].name);
        let userID : string;
        if(tagged_user){
            userID = tagged_user.id;
        } else {
            userID = interaction.user.id;
        }
        
        const Table = Databases.filter(x => x.name === interaction.guild?.id)[0];
        const user = await Table.findOne({ where: { userID: userID } });

        if(user) {
            const xp       : number = user.get("xp")     as number;
            const tokens   : number = user.get("tokens") as number;
            const level    : number = user.get("level")  as number;
            
            const content : string = "You are lvl " + level + " with " + xp + " XP. And you have " + tokens + " Token(s) left over to use.";
    
            await interaction.reply({
                content
            });
        } else {
            await interaction.reply("you or the user you mentioned never wrote before");

            console.log("didn't find the user");
            
        }
    }
}; 