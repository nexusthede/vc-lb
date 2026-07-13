const User = require("../models/User");


const activeVoiceUsers = new Map();



function addUser(member){

    if(member.user.bot)
        return;


    activeVoiceUsers.set(

        `${member.guild.id}-${member.id}`,

        {
            guildId: member.guild.id,
            userId: member.id
        }

    );

}



function removeUser(member){

    activeVoiceUsers.delete(

        `${member.guild.id}-${member.id}`

    );

}



async function updateVoiceTime(){


    const updates = [];


    for(const user of activeVoiceUsers.values()){


        updates.push({

            updateOne:{

                filter:{

                    guildId:user.guildId,
                    userId:user.userId

                },


                update:{

                    $inc:{

                        voiceTime:60

                    }

                },


                upsert:true

            }

        });


    }



    if(updates.length){


        await User.bulkWrite(
            updates
        );


    }


}



module.exports = {

    activeVoiceUsers,

    addUser,

    removeUser,

    updateVoiceTime

};
