const {
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const Guild = require("../models/Guild");
const config = require("../config");


module.exports = {

    name: "set",


    async execute(
        client,
        message,
        args
    ){


        if(
            !message.member.permissions.has(
                PermissionFlagsBits.Administrator
            )
        ){

            return message.reply({

                embeds:[

                    new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setDescription(
                        "You need Administrator permission to use this command."
                    )

                ]

            });

        }



        const type =
        args[0]?.toLowerCase();



        const channel =
        message.mentions.channels.first();



        if(!type || !channel){

            return message.reply({

                embeds:[

                    new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setDescription(
`
Syntax:
${config.prefix}set chatlb #channel
${config.prefix}set vclb #channel
`
                    )

                ]

            });

        }



        let data =
        await Guild.findOne({

            guildId:
            message.guild.id

        });



        if(!data){

            data =
            await Guild.create({

                guildId:
                message.guild.id

            });

        }





        if(type === "chatlb"){


            data.chatLeaderboardChannel =
            channel.id;


            data.chatLeaderboardMessage =
            null;


        }



        else if(type === "vclb"){


            data.voiceLeaderboardChannel =
            channel.id;


            data.voiceLeaderboardMessage =
            null;


        }



        else{


            return message.reply({

                embeds:[

                    new EmbedBuilder()
                    .setColor(config.embedColor)
                    .setDescription(
`
Syntax:
${config.prefix}set chatlb #channel
${config.prefix}set vclb #channel
`
                    )

                ]

            });

        }



        await data.save();



        const reply =
        await message.reply({

            embeds:[

                new EmbedBuilder()
                .setColor(config.embedColor)
                .setDescription(
                    `${type} channel has been set to ${channel}.`
                )

            ]

        });



        setTimeout(()=>{

            reply.delete()
            .catch(()=>{});

        },5000);



    }

};
