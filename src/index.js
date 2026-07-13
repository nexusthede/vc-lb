const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const config = require("./config");


const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates

    ]

});


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



mongoose.connect(config.mongoURI)
.then(()=>{

    console.log(
        "MongoDB Connected"
    );

})
.catch(console.error);



client.login(config.token);
