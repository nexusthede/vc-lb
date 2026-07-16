const {
    Client,
    GatewayIntentBits,
    Collection,
    DefaultWebSocketManagerOptions
} = require("discord.js");


// Mobile status
DefaultWebSocketManagerOptions.identifyProperties.browser =
"Discord Android";


const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const express = require("express");

const config = require("./config");


// Allowed servers

const ALLOWED_GUILD_IDS = [
    "1406596836793516102",
    "1526168767988764722"
];


// Render / Better Stack uptime

const app = express();

app.get("/", (req, res) => {

    res.send("Bot is online");

});


app.listen(process.env.PORT || 3000, () => {

    console.log(
        "Web server started"
    );

});


// Discord Client

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates

    ]

});


// Error logging

client.on("error", console.error);

client.on("shardError", console.error);

client.on("warn", console.warn);

process.on("unhandledRejection", console.error);

process.on("uncaughtException", console.error);



client.commands = new Collection();



function loadCommands(dir){

    const files = fs.readdirSync(dir);


    for(const file of files){

        const location =
        path.join(dir,file);


        if(fs.statSync(location).isDirectory()){

            loadCommands(location);
            continue;

        }


        if(!file.endsWith(".js"))
            continue;



        const command =
        require(location);



        if(!command.name)
            continue;



        client.commands.set(
            command.name,
            command
        );


        if(command.aliases){

            command.aliases.forEach(alias=>{

                client.commands.set(
                    alias,
                    command
                );

            });

        }

    }

}



loadCommands(
    path.join(__dirname,"commands")
);



const eventsPath =
path.join(__dirname,"events");



fs.readdirSync(eventsPath)
.forEach(file=>{


    const event =
    require(
        path.join(
            eventsPath,
            file
        )
    );


    if(event.once){

        client.once(
            event.name,
            (...args)=>
            event.execute(
                ...args,
                client
            )
        );

    } else {


        client.on(
            event.name,
            (...args)=>
            event.execute(
                ...args,
                client
            )

        );

    }


});



// Auto leave unauthorized servers

client.on("guildCreate", async (guild) => {

    if(!ALLOWED_GUILD_IDS.includes(guild.id)){

        console.log(
            `Leaving unauthorized server: ${guild.name}`
        );


        await guild.leave()
        .catch(console.error);

    }

});



// Check servers on restart

client.once("ready", async () => {

    for(const guild of client.guilds.cache.values()){

        if(!ALLOWED_GUILD_IDS.includes(guild.id)){

            console.log(
                `Leaving unauthorized server: ${guild.name}`
            );


            await guild.leave()
            .catch(console.error);

        }

    }

});



// MongoDB

mongoose.connect(config.mongoURI)

.then(()=>{

    console.log(
        "MongoDB Connected"
    );

})

.catch(console.error);



// Discord Login

console.log(
    "Token:",
    config.token ? "FOUND" : "MISSING"
);


client.login(config.token)

.then(()=>{

    console.log(
        "Discord login successful"
    );

})

.catch(err=>{

    console.error(
        "Discord login failed:",
        err
    );

});
