const {
    updateVoiceTime
} = require("../utils/voiceTracker");


const {
    updateAll
} = require("../utils/leaderboardUpdater");


const config = require("../config");



module.exports = {


    name:"ready",


    once:true,



    async execute(client){



        console.log(
            `${client.user.tag} online`
        );



        // VC time tracker

        setInterval(async()=>{


            try{

                await updateVoiceTime();

            }catch(err){

                console.error(
                    "VC Tracker:",
                    err
                );

            }


        },60000);





        // Leaderboard updater

        setInterval(async()=>{


            try{

                await updateAll(client);

            }catch(err){

                console.error(
                    "Leaderboard:",
                    err
                );

            }


        },config.leaderboardUpdateInterval);



    }


};
