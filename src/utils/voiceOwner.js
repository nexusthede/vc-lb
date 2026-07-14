const VoiceChannel = require("../models/VoiceChannel");


async function getVoiceOwner(channelId){

    return await VoiceChannel.findOne({
        channelId
    });

}


async function isOwner(channelId,userId){

    const data = await VoiceChannel.findOne({
        channelId
    });


    if(!data)
        return false;


    return data.ownerId === userId;

}


module.exports = {

    getVoiceOwner,

    isOwner

};
