const config = require("../config");

const {
    createVoice,
    deleteVoice
} = require("../utils/voiceHandler");

const {
    savePreviousChannel,
    getPreviousChannel
} = require("../utils/unmuteTracker");

const {
    handleRandomVoice
} = require("../utils/randomVoice");


module.exports = {

    name:"voiceStateUpdate",


    async execute(oldState,newState){


        const member =
        newState.member ||
        oldState.member;


        if(!member || member.user.bot)
            return;



        // Save last VC

        if(oldState.channelId){

            savePreviousChannel(
                member,
                oldState.channel
            );

        }



        // Join To Create

        if(
            newState.channelId ===
            config.voiceChannels.joinToCreate
        ){

            await createVoice(member);

        }



        // Unmute VC

        if(
            newState.channelId ===
            config.voiceChannels.unmute
        ){


            // Normal users stay

            if(
                !member.voice.serverMute &&
                !member.voice.serverDeaf
            )
                return;



            const previous =
            getPreviousChannel(
                member.id
            );


            if(!previous)
                return;



            const channel =
            member.guild.channels.cache.get(
                previous
            );


            if(channel){

                await member.voice.setChannel(
                    channel
                );

            }


        }



        // Random VC

        if(
            newState.channelId ===
            config.voiceChannels.random
        ){

            await handleRandomVoice(
                member
            );

        }



        // Delete empty VoiceMaster rooms

        if(oldState.channel){

            const channel =
            oldState.channel;


            if(

                channel.parentId ===
                config.voiceCategories.public ||

                channel.parentId ===
                config.voiceCategories.private

            ){

                if(channel.members.size === 0){

                    await deleteVoice(channel);

                }

            }

        }


    }

};
