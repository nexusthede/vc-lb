const config = require("../config");
const User = require("../models/User");



module.exports = {


    name:"messageCreate",



    async execute(
        message,
        client
    ){


        if(
            message.author.bot ||
            !message.guild
        )
            return;



        // Track chat messages

        await User.findOneAndUpdate(

            {

                guildId:
                message.guild.id,


                userId:
                message.author.id

            },


            {

                $inc:{
                    messages:1
                }

            },


            {

                upsert:true

            }

        );





        // Commands

        if(
            !message.content.startsWith(
                config.prefix
            )
        )
            return;



        const args =
        message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/);



        const commandName =
        args.shift()
        ?.toLowerCase();



        const command =
        client.commands.get(
            commandName
        );



        if(!command)
            return;



        command.execute(
            client,
            message,
            args
        );



    }


};
