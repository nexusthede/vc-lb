const {
    ChannelType
} = require("discord.js");

const config = require("../config");


async function handleRandomVoice(member){


    const available =
    member.guild.channels.cache.filter(channel => {


        if(
            channel.type !== ChannelType.GuildVoice
        )
            return false;



        // Ignore special channels

        if(

            channel.id === config.voiceChannels.random ||

            channel.id === config.voiceChannels.joinToCreate ||

            channel.id === config.voiceChannels.unmute

        )
            return false;



        const permissions =
        channel.permissionsFor(member);



        if(!permissions)
            return false;



        // Only rooms they can see and join

        return (

            permissions.has("Connect") &&

            permissions.has("ViewChannel")

        );


    });



    if(!available.size)
        return;



    const rooms =
    [...available.values()];



    const randomRoom =
    rooms[
        Math.floor(
            Math.random() *
            rooms.length
        )
    ];



    await member.voice.setChannel(
        randomRoom
    );


}



module.exports = {

    handleRandomVoice

};
