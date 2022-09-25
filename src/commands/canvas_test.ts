import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { canvas_test } from "../parameters/commands.json";
import { createCanvas, loadImage } from "canvas";
import { MessageAttachment } from "discord.js";

// TODO make dev command only
export const CanvasTest: Command = {
    name: canvas_test.name,
    description: canvas_test.description,
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {

        const can = createCanvas(1500, 1130);
        const ctx = can.getContext("2d");

        ctx.lineWidth = 8;
        ctx.strokeStyle = "grey";

        ctx.beginPath();
        ctx.moveTo(300, 0);
        ctx.lineTo(300, 900);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(600, 0);
        ctx.lineTo(600, 900);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 300);
        ctx.lineTo(900, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 600);
        ctx.lineTo(900, 600);
        ctx.stroke();

        const content = new MessageAttachment(can.toBuffer(), "image.png");

        await interaction.editReply({ files: [content] });
    }
}; 