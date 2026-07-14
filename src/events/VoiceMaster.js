const config = require("../config");

const {
    createVoice,
    deleteVoice
} = require("../utils/voiceHandler");


module.exports = {

    name: "voiceStateUpdate",


    async execute(oldState, newState){


        const member =
        newState.member ||
        oldState.member;


        if(!member || member.user.bot)
            return;



        // Join To Create

        if(
            newState.channelId ===
            config.voiceChannels.joinToCreate
        ){

            await createVoice(member);

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
