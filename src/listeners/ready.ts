import { Client, Events } from "discord.js";
import { Commands } from "../Commands";
import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { XP, ArchiveQuotes, ArchiveQuizz } from "./../parameters/databases.json";

export default (client: Client): ModelStatic<Model<any, any>>[][] => {

    // initialize database
    const sequelize : Sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        // SQLite only
        storage: 'database.sqlite',
    });

    // declare and initialize database Arrays
    const DatabasesXP            : ModelStatic<Model<any, any>>[] = [];
    const DatabasesArchiveQuizz  : ModelStatic<Model<any, any>>[] = [];
    const DatabasesArchiveQuotes : ModelStatic<Model<any, any>>[] = [];

    client.on(Events.ClientReady, async () => {

        // getting all guilds, where the bot is in
        const Guilds = client.guilds.cache.map(guild => guild.id);

        // xp Database
        Guilds.forEach(guildID => {
            DatabasesXP.push(
                sequelize.define(guildID + XP.suffix, {
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

        // archive quizz Database
        Guilds.forEach(guildID => {
            DatabasesArchiveQuizz.push(
                sequelize.define(guildID + ArchiveQuizz.suffix, {
                    userID: {
                        type: DataTypes.STRING,
                        unique: true,
                        allowNull : false
                    },
                    correct: {
                        type: DataTypes.FLOAT(10, 0),
                        defaultValue: 0,
                        allowNull: false,
                    },
                    false: {
                        type: DataTypes.FLOAT(10, 0),
                        defaultValue: 0,
                        allowNull: false,
                    },
                    username: {
                        type: DataTypes.STRING,
                        unique: false,
                        allowNull : false
                    }
                }, {
                    freezeTableName: true
                })
            )
        });

        // Archive Quotes Database
        Guilds.forEach(guildID => {
            DatabasesArchiveQuotes.push(
                sequelize.define(guildID + ArchiveQuotes.suffix, {
                    content: {
                        type: DataTypes.STRING,
                        unique: false,
                        allowNull: false
                    },
                    user: {
                        type: DataTypes.STRING,
                        unique: false,
                        allowNull: false
                    },
                    date: {
                        type: DataTypes.STRING,
                        unique: false,
                        allowNull: false
                    },
                    inQuizz: {
                        type: DataTypes.BOOLEAN,
                        unique: false,
                        allowNull: false,
                        defaultValue : false
                    },
                    userQuizz: {
                        type: DataTypes.STRING,
                        unique: false,
                        allowNull: true
                    }
                }, {
                    freezeTableName: true
                })
            )
        });

        // syncing all databases
        DatabasesXP.forEach(database => {
            database.sync();
        });
        DatabasesArchiveQuizz.forEach(database => {
            database.sync();
        });
        DatabasesArchiveQuotes.forEach(database => {
            database.sync();
        });

        if (!client.user || !client.application) {
            return;
        }

        // sets all commands
        await client.application.commands.set(Commands);

        console.log(`${client.user.username} is online`);        
        
    })
    
    return [DatabasesXP, DatabasesArchiveQuizz, DatabasesArchiveQuotes]

};