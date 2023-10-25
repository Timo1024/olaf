import { Client, Events } from "discord.js";
import { Commands } from "../Commands";
import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";

export default (client: Client): ModelStatic<Model<any, any>>[] => {

    // initialize database
    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        // SQLite only
        storage: 'database.sqlite',
    });

    const Databases: ModelStatic<Model<any, any>>[] = [];

    client.on(Events.ClientReady, async () => {

        const Guilds = client.guilds.cache.map(guild => guild.id);

        Guilds.forEach(guildID => {
            Databases.push(
                sequelize.define(guildID, {
                    userID: {
                        type: DataTypes.STRING,
                        unique: true,
                    },
                    tokens: {
                        type: DataTypes.FLOAT(10, 0),
                        defaultValue: 0,
                        allowNull: false,
                    },
                    xp: {
                        type: DataTypes.INTEGER,
                        defaultValue: 0,
                        allowNull: false,
                    },
                    level: {
                        type: DataTypes.FLOAT(10, 0),
                        defaultValue: 0,
                        allowNull: false,
                    },
                    imageLink: {
                        type: DataTypes.STRING,
                        defaultValue: null,
                        allowNull: true,
                        unique: true
                    },
                    accentColor: {
                        type: DataTypes.STRING,
                        defaultValue: "#b69fa3",
                        allowNull: false
                    }
                }, {
                    freezeTableName: true
                })
            )
        });

        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);

        Databases.forEach(database => {
            database.sync();
        });
        console.log(`${client.user.username} is online`);

    });

    return Databases


};