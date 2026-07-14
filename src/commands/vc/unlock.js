const { EmbedBuilder } = require("discord.js");
const config = require("../../config");
const VoiceChannel = require("../../models/VoiceChannel");


module.exports = {

    name:"unlock",

    async execute(client,message,args){


        const channel =
        message.member.voice.channel;



        if(!channel)

            return message.channel.send({

                embeds:[

                    new EmbedBuilder()

                    .setColor(config.errorColor)

                    .setDescription(
                        `<:x_failed:1526498753798738010> You must be connected to a voice channel to use this command.`
                    )

                ]

            });



        const data =
        await VoiceChannel.findOne({

            channelId:channel.id

        });



        if(!data || data.ownerId !== message.author.id)

            return message.channel.send({

                embeds:[

                    new EmbedBuilder()

                    .setColor(config.errorColor)

                    .setDescription(
                        `<:x_failed:1526498753798738010> You don't own **${channel.name}**.`
                    )

                ]

            });



        const everyone =
        channel.permissionOverwrites.cache.get(
            message.guild.roles.everyone.id
        );



        if(
            !everyone ||
            !everyone.deny.has("Connect")
        )

            return message.channel.send({

                embeds:[

                    new EmbedBuilder()

                    .setColor(config.errorColor)

                    .setDescription(
                        `<:x_failed:1526498753798738010> **${channel.name}** is already unlocked.`
                    )

                ]

            });



        await channel.permissionOverwrites.edit(

            message.guild.roles.everyone,

            {
                Connect:null
            }

        );



        if(config.voiceCategories?.public)

            await channel.setParent(
                config.voiceCategories.public
            );



        message.channel.send({

            embeds:[

                new EmbedBuilder()

                .setColor(config.successColor)

                .setDescription(
                    `<:vc_unlock:1526495168130318348> **${channel.name}** has been unlocked.`
                )

            ]

        });


    }

};
