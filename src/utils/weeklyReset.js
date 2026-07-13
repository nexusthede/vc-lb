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

                    lastReset:new Date()

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


    let lastRun = null;



    setInterval(async()=>{


        const now =
        new Date();



        if(

            now.getDay() === 0 &&

            now.getHours() === 0 &&

            now.getMinutes() === 0

        ){


            const today =
            now.toDateString();



            if(lastRun !== today){


                lastRun = today;


                await resetLeaderboards();


            }


        }



    },60000);



}



module.exports = {
    startWeeklyReset,
    resetLeaderboards
};
