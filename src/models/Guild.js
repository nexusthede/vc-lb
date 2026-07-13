const mongoose = require("mongoose");


const GuildSchema =
new mongoose.Schema({


    guildId:{
        type:String,
        unique:true,
        required:true
    },


    chatLeaderboardChannel:{
        type:String,
        default:null
    },


    chatLeaderboardMessage:{
        type:String,
        default:null
    },


    voiceLeaderboardChannel:{
        type:String,
        default:null
    },


    voiceLeaderboardMessage:{
        type:String,
        default:null
    },


    lastReset:{
        type:Date,
        default:Date.now
    }


});



module.exports =
mongoose.model(
    "Guild",
    GuildSchema
);
