import { CommandInteraction, Client, Guild, GuildMember, EmbedBuilder, User } from "discord.js";
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { Command } from "../Command";
import { user_data } from "../parameters/commands.json";
import { guild_id } from "../parameters/server.json";
import { makeDescription } from "../lib/generalLib";

export const UserInfo: Command = {
    name: user_data.name,
    description: makeDescription(user_data),
    options: [
        {
            name: user_data.options[0].name,
            description: user_data.options[0].description,
            type: ApplicationCommandOptionType.User
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
        let response : string | EmbedBuilder;

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

                response = new EmbedBuilder()
                    .setAuthor({
                        name: user.username
                    })
                    .setThumbnail(user.avatarURL() as string)
                    .setDescription("-----------------------------------------------------------")
                    .setColor("#64FF00")
                    .addFields(
                        {name : "Full Username:", value : user.tag , inline : true},
                        {name : "Nickname:", value : member.nickname ? member.nickname : "no nickname" , inline : true},
                        {name : "ID:", value : user.id, inline : false},
                        {name : "Created at:", value : erstellt_date, inline : true}
                    )

            } else {
                response = new EmbedBuilder().setDescription("user id not defined")
            }

        } else {
            response = new EmbedBuilder().setDescription("guild id not defined")
        }

        await interaction.reply({embeds: [ response ]});
    }
};