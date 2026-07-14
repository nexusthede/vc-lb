const fs = require("fs");
const path = require("path");


const vcCommands = new Map();


const commandPath = __dirname;


fs.readdirSync(commandPath)
.forEach(file => {

    if(
        file === "handler.js" ||
        !file.endsWith(".js")
    )
        return;


    const command =
    require(
        path.join(
            commandPath,
            file
        )
    );


    vcCommands.set(
        command.name,
        command
    );

});



module.exports = {

    name: "vc",


    async execute(client, message, args){


        const subCommand =
        args.shift()?.toLowerCase();



        const command =
        vcCommands.get(subCommand);



        if(!command)
            return;



        await command.execute(
            client,
            message,
            args
        );


    }

};
