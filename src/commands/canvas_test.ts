import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { canvas_test } from "../parameters/commands.json";
import { createCanvas, loadImage } from "canvas";
import { MessageAttachment } from "discord.js";

// TODO make dev command only
export const CanvasTest: Command = {
    name: canvas_test.name,
    description: canvas_test.description,
    options: [
        {
            name: canvas_test.options[0].name,
            description: canvas_test.options[0].description,
            type: "STRING",
            required: true
        },
        {
            name: canvas_test.options[1].name,
            description: canvas_test.options[1].description,
            type: "STRING",
            required: true
        }
    ],
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {

        // get interaction values
        let firstLetter  = interaction.options.get(canvas_test.options[0].name)?.value as string
        let secondLetter = interaction.options.get(canvas_test.options[1].name)?.value as string

        // draw canvas
        const can = createCanvas(1000, 700);
        const ctx = can.getContext("2d");

        ctx.lineWidth = 8;
        ctx.strokeStyle = "red";

        var centerX = 350; 
        var centerY = 200; 

        var radius = 150; 

        // I think these values are the angles for the bottom half - otherwise use other values
        var startingAngle = Math.PI - 0.6;
        var endingAngle = 0;
        var counterclockwise = false;

        ctx.arc(centerX, centerY, radius, startingAngle, endingAngle, counterclockwise);
        ctx.stroke();

        var centerX = 650; 
        var centerY = 200; 

        var radius = 150; 

        // I think these values are the angles for the bottom half - otherwise use other values
        var startingAngle = Math.PI;
        var endingAngle = 0 + 0.6;
        var counterclockwise = false;

        ctx.arc(centerX, centerY, radius, startingAngle, endingAngle, counterclockwise);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(222, 278);
        ctx.lineTo(can.width / 2, 650);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1000-222, 278);
        ctx.lineTo(can.width / 2, 650);
        ctx.stroke();

        ctx.fillStyle = "red";
        ctx.font = "100px monospace";
        var txt = firstLetter + " + " + secondLetter;
        ctx.fillText(txt, (can.width / 2) - (ctx.measureText(txt).width / 2), 330);
        ctx.strokeText(txt, (can.width / 2) - (ctx.measureText(txt).width / 2), 330);

        const content = new MessageAttachment(can.toBuffer(), "image.png");

        await interaction.editReply({ files: [content] });
    }
}; 