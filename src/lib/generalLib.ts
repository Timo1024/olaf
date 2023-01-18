import { CommandInteraction, Collection, GuildMemberRoleManager, Role } from "discord.js";
import { members } from "../parameters/server.json";

// checking if the user who used the command is a developer
export async function developer(interaction : CommandInteraction) : Promise<boolean> {
    return members.developers.includes(interaction.user.id);
}

// makes the desription for a command
export function makeDescription(jsonObject : { description : string, tokens : number }) : string {

    if (jsonObject.tokens < 0) {
        return "[use " + Math.abs(jsonObject.tokens) + "] " + jsonObject.description;
    } else if (jsonObject.tokens > 0) {
        return "[get " + jsonObject.tokens + "] " + jsonObject.description;
    } else {
        return "[free] " + jsonObject.description;
    }

}