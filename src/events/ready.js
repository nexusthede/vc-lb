const {
    updateVoiceTime
} = require("../utils/voiceTracker");


const {
    updateAll
} = require("../utils/leaderboardUpdater");


const {
    startWeeklyReset
} = require("../utils/weeklyReset");


const config = require("../config");



module.exports = {


    name:"ready",


    once:true,


    async execute(client){


        console.log(
            `${client.user.tag} online`
        );



        // Track VC every minute

        setInterval(async()=>{


            try{

                await updateVoiceTime();

            }

            catch(err){

                console.error(
                    err
                );

            }


        },60000);





        // Update leaderboard embeds

        setInterval(async()=>{


            try{

                await updateAll(client);

            }

            catch(err){

                console.error(
                    err
                );

            }


        },config.leaderboardUpdateInterval);





        // Weekly reset

        startWeeklyReset();



    }


};
