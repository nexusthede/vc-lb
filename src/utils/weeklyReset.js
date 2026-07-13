const User = require("../models/User");
const Guild = require("../models/Guild");


async function resetLeaderboards(){

    try {


        await User.updateMany(

            {},

            {

                $set:{

                    messages:0,
                    voiceTime:0

                }

            }

        );



        await Guild.updateMany(

            {},

            {

                $set:{

                    lastReset:Date.now()

                }

            }

        );



        console.log(
            "Weekly leaderboards reset."
        );



    } catch(err){

        console.error(
            "Weekly reset error:",
            err
        );

    }

}



function startWeeklyReset(){


    setInterval(async()=>{


        const now =
        new Date();



        // Sunday 12:00 AM

        if(

            now.getDay() === 0 &&

            now.getHours() === 0 &&

            now.getMinutes() === 0

        ){


            await resetLeaderboards();


        }



    },60000);



}



module.exports = {
    startWeeklyReset,
    resetLeaderboards
};
