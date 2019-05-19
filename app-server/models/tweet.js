var mongoose = require('mongoose');

//Tweet schema
var tweetSchema = mongoose.Schema({ 
    content:{
        type:String,
        required : true
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    createdUser:{
        _id:mongoose.Schema.Types.ObjectId
    },
    comments: [{userName:String,comment:String, commentedAt:Date}],
    likes:[{userName:String}],
    retweets:[{userName:String}]
});

module.exports=tweetSchema;