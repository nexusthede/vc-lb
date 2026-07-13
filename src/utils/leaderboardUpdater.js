const Guild = require("../models/Guild");

const {
    updateChatLeaderboard
} = require("./chatLeaderboard");

const {
    updateVoiceLeaderboard
} = require("./voiceLeaderboard");


async function updateAll(client){

    const guilds =
    await Guild.find();


    for(const data of guilds){


        if(data.chatLeaderboardChannel){

            await updateChatLeaderboard(
                data,
                client
            );

        }


        if(data.voiceLeaderboardChannel){

            await updateVoiceLeaderboard(
                data,
                client
            );

        }


    }

}


module.exports = {
    updateAll
};
