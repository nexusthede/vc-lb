const {
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");
const config = require("../config");



function formatTime(seconds){


    const hours =
    Math.floor(seconds / 3600);


    const minutes =
    Math.floor(
        (seconds % 3600) / 60
    );


    return `${hours} hours, ${minutes} minutes`;

}



async function updateVoiceLeaderboard(data, client){


    const channel =
    await client.channels.fetch(
        data.voiceLeaderboardChannel
    )
    .catch(()=>null);



    if(!channel)
        return;



    const users =
    await User.find({

        guildId:
        channel.guild.id

    })
    .sort({

        voiceTime:-1

    })
    .limit(
        config.leaderboardLimit
    );



    const total =
    users.reduce(
        (a,b)=>a + b.voiceTime,
        0
    );



    let text =
`**Voice Leaderboard**
Combined Hours: **[${formatTime(total)}](https://example.com)**

`;



    users.forEach((user,index)=>{


        text +=
        `> \`${String(index + 1).padStart(2,"0")}\` <@${user.userId}> • **[${formatTime(user.voiceTime)}](https://example.com)**\n`;


    });



    text +=
`\n-# Reset in 7 Days`;



    const embed =
    new EmbedBuilder()

    .setColor(
        config.embedColor
    )

    .setThumbnail(
        channel.guild.iconURL({
            dynamic:true
        })
    )

    .setDescription(text);



    let message;



    if(data.voiceLeaderboardMessage){


        message =
        await channel.messages.fetch(
            data.voiceLeaderboardMessage
        )
        .catch(()=>null);


    }



    if(message){


        await message.edit({

            embeds:[
                embed
            ]

        });


    }
    else{


        message =
        await channel.send({

            embeds:[
                embed
            ]

        });



        data.voiceLeaderboardMessage =
        message.id;


        await data.save();


    }


}



module.exports = {
    updateVoiceLeaderboard
};
