var express = require('express');
var router = express.Router();
var Tweet = require('../models/tweet');
var mongoose = require('mongoose');
var User = require('../models/user')


const verifyToken = require('../middleware/verifyToken');
router.use(verifyToken());

//get tweets
router.get('/', function(req, res) {
    Tweet.find({}).sort({'createdDate':-1}).populate('comments.likes comments.user likes.user retweets.user createdUser.user retweeted').exec((err,tweets)=>{
        if(tweets.length>0 || tweets!=undefined) res.json(tweets);
        else res.json({success:false});
    })
});

//select one tweet by id
router.get('/:id',(req,res)=>{
    const objId = new mongoose.Types.ObjectId(req.params.id);

    try{
        Tweet.findOne({'_id':objId}).sort({'createdDate':-1}).populate('comments.likes comments.user likes.user retweets.user createdUser.user retweeted.tweet').exec((err,tweet)=>{
            res.json(tweet);
        })
    }
    catch(err){
        console.log(err);
    }

});

//select tweets by user
router.get('/self/:userId', function (req, res) {
    const objId = new mongoose.Types.ObjectId(req.params.userId);

    Tweet.find({createdUser: {user: objId}}).sort({'createdDate':-1}).populate('comments.likes comments.user likes.user retweets.user createdUser.user retweeted.tweet').exec((err, tweets) => {
        if(tweets.length>0 || tweets!=undefined) res.json(tweets);
        else res.json({success:false});
    })
});


//select tweets by userId
router.get('/user/:userId', function(req, res) {
    const objId = new mongoose.Types.ObjectId(req.params.userId);
    const userIDs = [];
    userIDs.push(objId);
    User.find({_id:objId},{'following._id':1,_id:0},(err,result)=>{
        if(result[0].following.length>0 && result[0].following!=null && result[0].following!=undefined){
            for(let i=0; i<result[0].following.length;i++){
                userIDs.push(new mongoose.Types.ObjectId(result[0].following[i]._id));
            }
        }
        Tweet.find({'createdUser.user':{$in:userIDs}}).sort({'createdDate':-1}).populate('comments.likes.user comments.user likes.user retweets.user createdUser.user retweeted.tweet').exec((err,result)=>{
            res.json(result);
        });
        //console.log(userIDs);
    })
});

router.delete('/:tweetId',(req,res)=>{
    const objId = new mongoose.Types.ObjectId(req.params.tweetId);

    try{
        Tweet.findByIdAndDelete({_id:objId},(err,doc)=>{
            res.json({success:true});
        })
    }
    catch(err){
        console.log(err);
    }

})

router.post('/',(req,res)=>{
    const newObj =req.body;
    //console.log(newObj);
    try{
        var tweet = new Tweet(newObj);
        if(tweet.retweeted!=null && tweet.retweeted!=undefined && tweet.retweeted !='{}')
        {
            const userId = mongoose.Types.ObjectId(tweet.createdUser.user);
            const tweetId = mongoose.Types.ObjectId(tweet.retweeted.tweet);

            Tweet.updateOne({_id:tweetId},{$addToSet:{'retweets':userId}},(err,result)=>{
                //console.log(userId," added to retweets of this ",tweetId," tweet!");
                //console.log('result : ',result);
                //console.log('changed!!!');
            });
        }
        tweet.save(err=>{
            res.json({success:true});
        });

    }
    catch(err){
        console.log(err);
    }
});

router.put('/:tweetId',(req,res)=>{
    const updatedObj = req.body;
    try{
        Tweet.findOneAndUpdate({_id:req.params.tweetId},updatedObj,(err,doc)=>{
            res.json({success:true});
        })
    }
    catch(err){
        console.log(err);
    }

});

//like on tweet post

router.put('/:tweetId/like',(req,res)=>{
    const userObj = mongoose.Types.ObjectId(req.body.user);
    //console.log(user);
    try{
        Tweet.updateOne({_id:req.params.tweetId,'likes.user':{$ne:userObj}},{$push:{likes:{'user':userObj}}},(err,doc)=>{
            res.json({success:true});
        });
    }
    catch(err){
        console.log(err);
    }

})

//dislike on tweet post

router.delete('/:tweetId/like',(req,res)=>{
    const userObj = mongoose.Types.ObjectId(req.body.user);
    //console.log(req.body);
    try{
        Tweet.updateOne({_id:req.params.tweetId,'likes.user':{$eq:userObj}},{$pull:{likes:{'user':userObj}}},(err,doc)=>{
            res.json({success:true});
        });
    }
    catch(err){
        console.log(err);
    }

});

//comment on post
router.put('/:tweetId/comment',(req,res)=>{
    const comment = req.body;
    //console.log(comment);
    try{
        Tweet.updateOne({_id:req.params.tweetId},{$push:{comments:comment}},(err,doc)=>{
            res.json({success:true});
        });
    }
    catch(err){
        console.log(err);
    }
});

//delete comment from post
router.delete('/:tweetId/comment/:commentId',(req,res)=>{
    //console.log(req.params.commentId);
    try{
        Tweet.updateOne({_id:req.params.tweetId},{$pull:{comments:{'_id':req.params.commentId}}},(err,doc)=>{
            res.json({success:true});
        });
    }
    catch(err){
        console.log(err);
    }

});



//like inside post comments

router.put('/:tweetId/comment/:commentId/like',(req,res)=>{
    const userObj = mongoose.Types.ObjectId(req.body.user);
    //console.log(user);
    try{
        Tweet.updateOne({'_id':req.params.tweetId,'comments._id':req.params.commentId},{$addToSet:{'comments.$.likes':userObj}},(err,doc)=>{
            res.json({success:true});
        })
    }
    catch(err){
        console.log(err);
    }

});

//dislike inside post comments
router.delete('/:tweetId/comment/:commentId/like',(req,res)=>{
    const userObj = mongoose.Types.ObjectId(req.body.user);
    //console.log(user);
    try{
        Tweet.updateOne({'_id':req.params.tweetId,'comments._id':req.params.commentId},{$pull:{'comments.$.likes':userObj}},(err,doc)=>{
            res.json({success:true});
        })
    }
    catch(err){
        console.log(err);
    }

});

//stat

router.get('/:userId/stats',(req,res)=>{
    const stat = {
        "tweets":0,
        "likes":0,
        "followers":0,
        "following":0
    };
    const ObjId = mongoose.Types.ObjectId(req.params.userId);
    Tweet.find({ 'createdUser.user':ObjId }).countDocuments().exec().then((doc)=>{
        stat.tweets=doc;
        //total likes for all posts
        Tweet.aggregate([
            {$match:{'createdUser.user':ObjId}},
            {$unwind:{path:'$likes'}},
            {$group:{_id:{'likes':'$likes.user'},count:{$sum:1}}},
            {$group:{_id:null,'total':{$sum:'$count'}}},
            {$project:{_id:0,total:1}}
        ],(err,result)=>{
            if (err) throw err;
            if(result.length !=0) stat.likes = result[0].total;
            User.aggregate([
                {$match:{_id:ObjId}},
                {$project:{_id:0,followers:{$cond: {if: {$isArray:'$followers'}, then: {$size: '$followers'},else: 0}}, following:{$cond: {if: {$isArray:'$following'}, then: {$size: '$following'},else: 0}}}}
            ],(err,result)=>{
                if(err) throw err;
                //console.log(result);
                if(result.length!=0){
                    stat.followers = result[0].followers;
                    stat.following = result[0].following;
                }
                res.json(stat);
            })
        });

    }).catch((err)=>{
        console.log(err);
    })
});




module.exports = router;
