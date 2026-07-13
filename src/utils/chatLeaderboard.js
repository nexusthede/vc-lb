const {
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");
const config = require("../config");


async function updateChatLeaderboard(data, client){


    const channel =
    await client.channels.fetch(
        data.chatLeaderboardChannel
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

        messages:-1

    })
    .limit(
        config.leaderboardLimit
    );



    const total =
    users.reduce(
        (a,b)=>a + b.messages,
        0
    );



    let text =
`**Chat Leaderboard**
Combined Messages: ${total.toLocaleString()}

`;



    users.forEach((user,index)=>{


        text +=
        `> \`${String(index + 1).padStart(2,"0")}\` <@${user.userId}> • ${user.messages.toLocaleString()} messages\n`;


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



    if(data.chatLeaderboardMessage){


        message =
        await channel.messages.fetch(
            data.chatLeaderboardMessage
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



        data.chatLeaderboardMessage =
        message.id;


        await data.save();


    }


}



module.exports = {
    updateChatLeaderboard
};
