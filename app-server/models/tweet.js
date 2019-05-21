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
        user:{type: Schema.Types.ObjectId, ref: 'users'}
    },
    comments: [{user:{type: Schema.Types.ObjectId, ref: 'users'},comment:String, commentedAt:{type:Date,default:Date.now()},likes:[{type: Schema.Types.ObjectId, ref: 'users'}]}],
    likes:[{user:{type: Schema.Types.ObjectId, ref: 'users'}}],
    retweets:[{user:{type: Schema.Types.ObjectId, ref: 'users'}}],
    retweeted:{
        tweet:{type:Schema.Types.ObjectId,ref:'tweets'}
    }
});
tweetSchema.pre('save',function(next){
    if(this.retweeted!=null || this.retweeted!=undefined){
        // have to add it's user-id to retweets field of retweeted.tweet id
        // this.retweeted.tweet
    }
    next();
});

module.exports=mongoose.model('tweets',tweetSchema);
