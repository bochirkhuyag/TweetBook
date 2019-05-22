var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Tweet schema
var tweetSchema = new mongoose.Schema({
    content:{
        type:String,
        required : true
    },
    photo:{
        type:String
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    createdUser:{
        user:{type: Schema.Types.ObjectId, ref: 'users'}
    },
    comments: [{user:{type: Schema.Types.ObjectId, ref: 'users'},comment:String, commentedAt:{type:Date,default:Date.now()},likes:[{type: Schema.Types.ObjectId, ref: 'users'}]}],
    likes:[{user:{type: Schema.Types.ObjectId, ref: 'users'}}],
    retweets:[{type: Schema.Types.ObjectId, ref: 'users'}],
    retweeted:{
        tweet:{type:Schema.Types.ObjectId,ref:'tweets'}
    }
});

module.exports=mongoose.model('tweets',tweetSchema);
