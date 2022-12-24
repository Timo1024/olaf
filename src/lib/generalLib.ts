import { CommandInteraction, Collection, GuildMemberRoleManager, Role } from "discord.js";
import { members } from "../parameters/server.json";

// checking if the user who used the command is a developer
export async function developer(interaction : CommandInteraction) : Promise<boolean> {
    return members.developers.includes(interaction.user.id);
}