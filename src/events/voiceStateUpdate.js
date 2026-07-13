const {
    addUser,
    removeUser
} = require("../utils/voiceTracker");


module.exports = {

    name:"voiceStateUpdate",


    async execute(
        oldState,
        newState
    ){


        const member =
        newState.member ||
        oldState.member;



        if(
            !member ||
            member.user.bot
        )
            return;



        // Join VC

        if(
            !oldState.channel &&
            newState.channel
        ){

            addUser(member);

        }



        // Leave VC

        if(
            oldState.channel &&
            !newState.channel
        ){

            removeUser(member);

        }



        // Switch VC

        if(
            oldState.channel &&
            newState.channel &&
            oldState.channel.id !== newState.channel.id
        ){

            removeUser(member);

            addUser(member);

        }


    }


};
