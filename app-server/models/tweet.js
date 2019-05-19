var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Tweet schema
var tweetSchema = new mongoose.Schema({ 
    content:{
        type:String,
        required : true
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    createdUser:{
        "_id":{type: Schema.Types.ObjectId, ref: 'users'},
        "userName":String
    },
    comments: [{userId:{type: Schema.Types.ObjectId, ref: 'users'},userName:String,comment:String, commentedAt:{type:Date,default:Date.now()},likes:[{userId:{type: Schema.Types.ObjectId, ref: 'users'},userName:String}]}],
    likes:[{userId:{type: Schema.Types.ObjectId, ref: 'users'},userName:String}],
    retweets:[{userId:{type: Schema.Types.ObjectId, ref: 'users'},userName:String}],
    retweeted:{
        tweetId:{type:Schema.Types.ObjectId,ref:'tweets'}
    }
});

module.exports=mongoose.model('tweets',tweetSchema);
