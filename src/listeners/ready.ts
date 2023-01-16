import { Client } from "discord.js";
import { Commands } from "../Commands";
import { Sequelize, DataTypes, ModelCtor, Model } from "sequelize";

export default (client: Client): [ModelCtor<Model<any, any>>] => {

    // TODO maybe put this in own file
    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        // SQLite only
        storage: 'database.sqlite',
    });

    const Tags = sequelize.define('tags', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        description: DataTypes.TEXT,
        username: DataTypes.STRING,
        usage_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    });

    client.on("ready", async () => {

        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);

        Tags.sync();
        console.log(`${client.user.username} is online`);

    });

    return [Tags];

};