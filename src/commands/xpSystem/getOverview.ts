import { CommandInteraction, Client, User, Guild, GuildMember } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../../Command";
import { xp } from "../../parameters/commands.json"
import { makeDescription } from "../../lib/generalLib";
import { Databases } from "../../bot";
import { makeXPCard } from "../../lib/canvasLib";

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

        await interaction.deferReply();

        // get user
        const tagged_member : GuildMember | null = interaction.options.get(xp.getXPOverview.options[0].name) as GuildMember | null;
        const tagged_user : User | undefined = tagged_member?.user;
        let userID : string;
        if(tagged_user){
            userID = tagged_user.id;
        } else {
            userID = interaction.user.id;
        }

        const canvasBuffer : Buffer = await makeXPCard(tagged_user ? tagged_user : interaction.user, (interaction.guild as Guild).id, client);
        
        const Table = Databases.filter(x => x.name === interaction.guild?.id)[0];
        const user = await Table.findOne({ where: { userID: userID } });

        if(user) {
            const xp       : number = user.get("xp")     as number;
            const tokens   : number = user.get("tokens") as number;
            const level    : number = user.get("level")  as number;
            
            // const content : string = "You are lvl " + level + " with " + xp + " XP. And you have " + tokens + " Token(s) left over to use.";
    
            await interaction.editReply({ files: [{
                attachment: canvasBuffer,
                name: "image.png"
            }] });
        } else {
            await interaction.editReply("you or the user you mentioned never wrote before");

            console.log("didn't find the user");
            
        }
    }
}; 