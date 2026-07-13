const {
    EmbedBuilder
} = require("discord.js");

const Guild = require("../models/Guild");
const User = require("../models/User");
const config = require("../config");



function formatNumber(num){

    return num.toLocaleString();

}



function formatTime(seconds){


    const hours =
    Math.floor(seconds / 3600);


    const minutes =
    Math.floor(
        (seconds % 3600) / 60
    );


    return `${hours} hours, ${minutes} minutes`;

}





async function createEmbed(
    guild,
    type
){


    let users;


    if(type === "chat"){

        users =
        await User.find({

            guildId:
            guild.id

        })
        .sort({

            messages:-1

        })
        .limit(
            config.leaderboardLimit
        );

    }


    else{


        users =
        await User.find({

            guildId:
            guild.id

        })
        .sort({

            voiceTime:-1

        })
        .limit(
            config.leaderboardLimit
        );

    }





    let total = 0;


    users.forEach(user=>{

        total +=
        type === "chat"
        ?
        user.messages
        :
        user.voiceTime;

    });





    let text =
    type === "chat"

    ?

`**Chat Leaderboard**
Combined Messages: [${formatNumber(total)}](https://example.com)

`

    :

`**Voice Leaderboard**
Combined Hours: [${formatTime(total)}](https://example.com)

`;





    users.forEach(
        (user,index)=>{


            text +=

            `> \`${String(index+1).padStart(2,"0")}\` <@${user.userId}> • `

            +

            (

            type === "chat"

            ?

            `${formatNumber(user.messages)} messages`

            :

            `${formatTime(user.voiceTime)}`

            )

            +

            "\n";


        }

    );




    text +=
    "\n-# Reset in 7 Days";





    return new EmbedBuilder()

    .setColor(config.embedColor)

    .setThumbnail(
        guild.iconURL({
            dynamic:true
        })
    )

    .setDescription(text);



}





async function updateBoard(
    data,
    client,
    type
){


    const channelId =
    type === "chat"

    ?

    data.chatLeaderboardChannel

    :

    data.voiceLeaderboardChannel;



    if(!channelId)
        return;



    const channel =
    await client.channels.fetch(
        channelId
    )
    .catch(()=>null);



    if(!channel)
        return;




    const embed =
    await createEmbed(
        channel.guild,
        type
    );



    let messageId =
    type === "chat"

    ?

    data.chatLeaderboardMessage

    :

    data.voiceLeaderboardMessage;



    let msg = null;



    if(messageId){


        msg =
        await channel.messages.fetch(
            messageId
        )
        .catch(()=>null);


    }





    if(msg){


        await msg.edit({

            embeds:[
                embed
            ]

        });


    }


    else{


        msg =
        await channel.send({

            embeds:[
                embed
            ]

        });



        if(type === "chat"){

            data.chatLeaderboardMessage =
            msg.id;

        }


        else{

            data.voiceLeaderboardMessage =
            msg.id;

        }



        await data.save();


    }



}





async function updateAll(client){


    const guilds =
    await Guild.find();



    for(const data of guilds){


        if(data.chatLeaderboardChannel)

            await updateBoard(
                data,
                client,
                "chat"
            );



        if(data.voiceLeaderboardChannel)

            await updateBoard(
                data,
                client,
                "voice"
            );

    }



}





module.exports = {
    updateAll
};
