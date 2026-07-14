const mongoose = require("mongoose");


const VoiceChannelSchema = new mongoose.Schema({

    guildId:{
        type:String,
        required:true
    },


    channelId:{
        type:String,
        unique:true,
        required:true
    },


    ownerId:{
        type:String,
        required:true
    }

});


module.exports =
mongoose.model(
    "VoiceChannel",
    VoiceChannelSchema
);
