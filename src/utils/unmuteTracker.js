const previousChannels = new Map();


function savePreviousChannel(member, channel){

    if(channel){

        previousChannels.set(
            member.id,
            channel.id
        );

    }

}


function getPreviousChannel(userId){

    return previousChannels.get(
        userId
    );

}


module.exports = {

    savePreviousChannel,

    getPreviousChannel

};
