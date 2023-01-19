import { createCanvas, Image, loadImage } from "canvas";
import { Client, User } from "discord.js";
import { Context } from "vm";
import { Databases } from "../bot";
import * as colors from "../parameters/colors.json";
import * as fs from "fs";

// TODO change any
export async function makeXPCard(CurrentUser : User, guildID : string, client : Client) : Promise<Buffer> {
    
    // get User
    const Table = Databases.filter(x => x.name === guildID)[0];
    const User = await Table.findOne({ where: { userID: CurrentUser.id } });

    // Prepare canvas
    const scaling = 3;

    const can = createCanvas(1500 * scaling, 500 * scaling);
    const ctx = can.getContext("2d");

    if(User){

        // get Information about user
        const tokens   : number = User.get("tokens") as number;
        const xp       : number = User.get("xp") as number;
        const level    : number = User.get("level") as number;
        console.log("Tokens: " + tokens);
        console.log("xp: " + xp);
        console.log("level: " + level);

        // calculate how close to next level
        const xpForNextLvl     = 10 * (level**2);
        const xpToNextLvl      = Math.max(xpForNextLvl - xp, 0);
        const xpForLastLvl     = Math.max(10 * ((level-1)**2), 0);
        const xpFromLastToNext = xpForNextLvl-xpForLastLvl;
        const percToNextLvl    = 1-(xpToNextLvl/xpFromLastToNext);

        console.log("xpForNextLvl: " + xpForNextLvl);
        console.log("xpToNextLvl: " + xpToNextLvl);
        console.log("xpForLastLvl: " + xpForLastLvl);
        console.log("xpFromLastToNext: " + xpFromLastToNext);
        console.log("percpercToNextLvl: " + percToNextLvl);

        // get user and data from him

        const Username : string = CurrentUser.username;
        const ProfilePicture : string = CurrentUser.displayAvatarURL({ 
            extension: 'png', 
            size: 2048
        }) as string;
         
        // draw canvas

        // const fontName : string = "Arial";
        const fontName : string = "cursive";
        
        const path : string = "src/commands/xpSystem/userImages/" + CurrentUser.id + ".png";
        if(fs.existsSync(path)){
            
                
            // background image
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(280 * scaling, 0, 1220 * scaling, 500 * scaling, 10 * scaling);
            ctx.clip();
            const image : Image = await loadImage(path);
            ctx.drawImage(image, 280 * scaling, 0, image.width, image.height);
            ctx.closePath();
            ctx.restore();

            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.beginPath();
            ctx.fillRect(0  *scaling, 50 * scaling, 1500 * scaling, 400 * scaling);
            ctx.closePath();

        } else {
            // background
            ctx.fillStyle = colors.backgroundMain;
            ctx.beginPath();
            ctx.roundRect(0,0,1500 * scaling,500 * scaling,10 * scaling);
            ctx.fill();
            ctx.closePath();
        }
        


        ctx.save();
        ctx.beginPath();
        ctx.roundRect(0, 0, 1500 * scaling, 500 * scaling, 10 * scaling);
        ctx.clip();
        ctx.fillStyle = colors.backgroundSecond;
        ctx.shadowColor=colors.black;
        ctx.shadowBlur=10*scaling;
        ctx.fillRect(0, 0, 300 * scaling, 500 * scaling);
        ctx.strokeRect(0, 0, 300 * scaling, 500 * scaling);
        ctx.closePath();
        ctx.restore();
        
        // circle around profile image
        // ctx.beginPath();
        // ctx.arc( 250 * scaling, 250 * scaling, 115 * scaling, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
        // ctx.strokeStyle = colors.backgroundSecond;
        // ctx.lineWidth = 15 * scaling;
        // ctx.stroke();

        const degrees : number = 360 * percToNextLvl;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.strokeStyle = colors.accentMain;
        ctx.lineWidth = 10 * scaling;
        ctx.arc( 150 * scaling, 200 * scaling, 115 * scaling, (Math.PI/180) * 270, (Math.PI/180) * (270 + degrees) );
        ctx.stroke();

        // porfile image
        ctx.save();
        ctx.beginPath();
        ctx.arc(150 * scaling, 200 * scaling, 100 * scaling, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.drawImage(await loadImage(ProfilePicture), 50 * scaling, 100 * scaling, 200 * scaling, 200 * scaling);
        ctx.closePath();
        ctx.restore();

        // level under profile image
        let fontSize : string = (40 * scaling).toString();
        ctx.font = fontSize + "px " + fontName;
        ctx.fillStyle = colors.accentMain;
        const levelText : string = "Level " + level.toString()
        ctx.fillText(levelText, (150 * scaling) - (ctx.measureText(levelText).width/2), 380 * scaling);

        // draw name of user
        fontSize = (70 * scaling).toString();
        ctx.font = fontSize + "px " + fontName;
        ctx.fillStyle = colors.accentMain;
        ctx.fillText(
            Username, 
            900 * scaling - ctx.measureText(Username).width/2, 
            175 * scaling
        );

        // draw tokens of user
        fontSize = (30 * scaling).toString();
        ctx.font = fontSize + "px " + fontName;
        ctx.fillStyle = colors.accentMain;
        const tokensText : string = "Tokens left: " + tokens;
        ctx.fillText(
            tokensText, 
            900 * scaling - ctx.measureText(tokensText).width/2, 
            400 * scaling
        );

        // make border around tokens
        ctx.strokeStyle = colors.accentMain;
        ctx.lineWidth = 1 * scaling;
        ctx.beginPath();
        ctx.roundRect(
            900 * scaling - ctx.measureText(tokensText).width/2 - 15 * scaling,
            400 * scaling - parseInt(fontSize) - 10 * scaling,
            ctx.measureText(tokensText).width + 30 * scaling,
            parseInt(fontSize) + 30 * scaling,
            10 * scaling);
        ctx.stroke();
        ctx.closePath();


        // make progress line
        // ctx.lineCap = 'round';
        // ctx.strokeStyle = colors.textMain;
        // ctx.lineWidth = 15 * scaling;
        // ctx.beginPath();
        // ctx.moveTo(500  * scaling, 200 * scaling);
        // ctx.lineTo(1300 * scaling, 200 * scaling);
        // ctx.stroke();

        const offset : number = 5 * scaling;
        const lineWidth : number = 15 * scaling;
        ctx.strokeStyle = colors.accentMain;
        ctx.lineWidth = 1 * scaling;
        ctx.beginPath();
        ctx.roundRect(
            500 * scaling - lineWidth/2 - offset, 
            250 * scaling - lineWidth/2 - offset,
            800 * scaling + (offset * 5),
            lineWidth + (offset * 2),
            (lineWidth + (offset * 2))/2);
        ctx.stroke();
        ctx.closePath();

        ctx.lineCap = 'round';
        ctx.strokeStyle = colors.accentMain;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(500 * scaling, 250 * scaling);
        ctx.lineTo(500 * scaling + Math.max(800 * scaling * percToNextLvl, 20 * scaling), 250 * scaling);
        ctx.stroke();

        // make an arrow pointing at the end of the progress bar
        ctx.strokeStyle = colors.accentMain;
        canvas_arrow(
            ctx, 
            505 * scaling + Math.max(800 * scaling * percToNextLvl, 20 * scaling),
            250 * scaling + lineWidth + 50 * scaling,
            505 * scaling + Math.max(800 * scaling * percToNextLvl, 20 * scaling),
            250 * scaling + lineWidth + 20 * scaling,
            10 * scaling
        );

        // write current xp below arrow
        let xpText : string = "";
        if(xp < 1000){
            xpText = (Math.round(xp*100)/100).toString() + " XP";
        } else if(xp >= 1000 && xp < 1000000){
            xpText = (Math.round((xp/1000)*100)/100).toString() + "k XP";
        } else {
            xpText = (Math.round((xp/1000000)*100)/100).toString() + "m XP";
        }

        fontSize = (30 * scaling).toString();
        ctx.font = fontSize + "px " + fontName;
        ctx.fillStyle = colors.accentMain;
        ctx.fillText(
            xpText, 
            (505 * scaling + Math.max(800 * scaling * percToNextLvl, 20 * scaling)) - (ctx.measureText(xpText).width/2), 
            315 * scaling + lineWidth
        );

        // write xp to need for next lvl at end of entire progress bar
        let xpNextLvlText : string = "";
        if(xpForNextLvl < 1000){
            xpNextLvlText = (Math.round(xpForNextLvl*100)/100).toString() + " XP";
        } else if(xpForNextLvl >= 1000 && xp < 1000000){
            xpNextLvlText = (Math.round((xpForNextLvl/1000)*100)/100).toString() + "k XP";
        } else {
            xpNextLvlText = (Math.round((xpForNextLvl/1000000)*100)/100).toString() + "m XP";
        }

        fontSize = (20 * scaling).toString();
        ctx.font = fontSize + "px " + fontName;
        ctx.fillStyle = colors.accentMain;
        ctx.fillText(
            xpNextLvlText, 
            1340 * scaling, 
            255 * scaling
        );

        // write xp to need for Last lvl at start of entire progress bar
        let xpLastLvlText : string = "";
        if(xpForLastLvl < 1000){
            xpLastLvlText = (Math.round(xpForLastLvl*100)/100).toString() + " XP";
        } else if(xpForLastLvl >= 1000 && xp < 1000000){
            xpLastLvlText = (Math.round((xpForLastLvl/1000)*100)/100).toString() + "k XP";
        } else {
            xpLastLvlText = (Math.round((xpForLastLvl/1000000)*100)/100).toString() + "m XP";
        }

        fontSize = (20 * scaling).toString();
        ctx.font = fontSize + "px " + fontName;
        ctx.fillStyle = colors.accentMain;
        ctx.fillText(
            xpLastLvlText, 
            460 * scaling - (ctx.measureText(xpLastLvlText).width), 
            256 * scaling
        );

    }






    return can.toBuffer();

}

function canvas_arrow(context : Context, fromx : number, fromy : number, tox : number, toy : number, r : number) : void {
    var x_center = tox;
    var y_center = toy;

    var angle;
    var x;
    var y;

    context.beginPath();

    angle = Math.atan2(toy-fromy,tox-fromx)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;

    context.moveTo(x, y);

    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;

    context.lineTo(x, y);

    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;

    context.lineTo(x, y);

    context.closePath();

    context.fill();
}