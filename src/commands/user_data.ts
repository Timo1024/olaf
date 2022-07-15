import { BaseCommandInteraction, Client, Guild, GuildMember, MessageEmbed, User } from "discord.js";
import { Command } from "../Command";
import { user_data } from "../parameters/commands.json";
import { guild_id } from "../parameters/server.json";

export const UserInfo: Command = {
    name: user_data.name,
    description: user_data.description,
    options: [
        {
            name: user_data.options[0].name,
            description: user_data.options[0].description,
            type: "USER"
        }
    ],
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        let response : string | MessageEmbed;

        const tagged_user : User | null = interaction.options.getUser(user_data.options[0].name);
        let user : User;
        if(tagged_user){
            user = tagged_user
        } else {
            user = interaction.user
        }



        var ea = user.createdAt.toString().split(" ");
        var et = ea[4].split(":");
        var erstellt_date = ea[2] + ". " + ea[1] + " " + ea[3] + " um " + et[0] + ":" + et[1] + " Uhr";
        
        const guild : Guild | undefined = client.guilds.cache.get(guild_id)

        if(guild){

            const member : GuildMember | undefined = guild.members.cache.get(user.id);

            if(member){

                response = new MessageEmbed()
                    .setAuthor({
                        name: user.username
                    })
                    .setThumbnail(user.avatarURL() as string)
                    .setDescription("-----------------------------------------------------------")
                    .setColor("#64FF00")
                    .addField("Full Username:", user.tag , true)
                    .addField("Nickname:", member.nickname ? member.nickname : "no nickname" , true)
                    .addField("ID:", user.id, false)
                    .addField("Created at:", erstellt_date, true)

            } else {
                response = new MessageEmbed().setDescription("user id not defined")
            }

        } else {
            response = new MessageEmbed().setDescription("guild id not defined")
        }

        await interaction.followUp({embeds: [ response ]});
    }
};