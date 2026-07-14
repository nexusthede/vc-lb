const {
    ChannelType,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config");

const VoiceChannel = require("../models/VoiceChannel");


async function createVoice(member){


    const channel =
    await member.guild.channels.create({

        name:`${member.displayName}'s room`,

        type:ChannelType.GuildVoice,

        parent:config.voiceCategories.public,


        permissionOverwrites:[

            {

                id:member.guild.roles.everyone.id,

                allow:[

                    PermissionFlagsBits.Connect

                ]

            },


            {

                id:member.id,

                allow:[

                    PermissionFlagsBits.Connect,

                    PermissionFlagsBits.ViewChannel,

                    PermissionFlagsBits.ManageChannels,

                    PermissionFlagsBits.MoveMembers

                ]

            }

        ]

    });



    await VoiceChannel.create({

        guildId:member.guild.id,

        channelId:channel.id,

        ownerId:member.id

    });



    await member.voice.setChannel(channel);



    return channel;

}



async function deleteVoice(channel){


    await VoiceChannel.deleteOne({

        channelId:channel.id

    });


    await channel.delete()
    .catch(()=>{});


}



module.exports = {

    createVoice,

    deleteVoice

};
