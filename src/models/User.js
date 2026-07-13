const mongoose = require("mongoose");


const UserSchema =
new mongoose.Schema({


    guildId:{
        type:String,
        required:true
    },


    userId:{
        type:String,
        required:true
    },


    messages:{
        type:Number,
        default:0
    },


    voiceTime:{
        type:Number,
        default:0
    }


});



UserSchema.index({
    guildId:1,
    messages:-1
});


UserSchema.index({
    guildId:1,
    voiceTime:-1
});


UserSchema.index({
    guildId:1,
    userId:1
});



module.exports =
mongoose.model(
    "User",
    UserSchema
);
