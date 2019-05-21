var express = require('express');
var router = express.Router();
var Tweet = require('../models/tweet');
var mongoose = require('mongoose');
var User = require('../models/user')

//get tweets
router.get('/', function(req, res) {
    Tweet.find({}).sort({'createdDate':-1}).populate('comments.likes comments.user likes.user retweets.user createdUser.user').exec((err,tweets)=>{
        if(tweets.length>0) res.json(tweets);
        else res.json({success:false});
    })
});

//select one tweet by id
router.get('/:id',(req,res)=>{
    const objId = new mongoose.Types.ObjectId(req.params.id);

    Tweet.findOne({'_id':objId}).sort({'createdDate':-1}).populate('comments.likes comments.user likes.user retweets.user createdUser.user').exec((err,tweet)=>{
        res.json(tweet);
    })
});

//select tweets by user
router.get('/self/:userId', function (req, res) {
    const objId = new mongoose.Types.ObjectId(req.params.userId);

    Tweet.find({createdUser: {user: objId}}).sort({'createdDate':-1}).populate('comments.likes comments.user likes.user retweets.user createdUser.user').exec((err, tweets) => {
        if(tweets.length>0) res.json(tweets);
        else res.json({success:false});
    })
});

//select by user
router.get('/user/:userId', function(req, res) {
    const objId = new mongoose.Types.ObjectId(req.params.id);
    User.find({_id:objId}).sort({'createdDate':-1}).populate('comments.likes.user comments.user likes.user retweets.user').exec((err,result)=>{
        res.json(result)
    });
    /*
    Tweet.find({'createdUser.userId':{$in:[User.find({_id:objId},{followers:1,_id:0}).toArray()]}},(err,tweets)=>{
          res.json(tweets);
        })
      */

});

router.delete('/:tweetId',(req,res)=>{
    const objId = new mongoose.Types.ObjectId(req.params.tweetId);
    Tweet.findByIdAndDelete({_id:objId},(err,doc)=>{
        if (err) throw err;
        res.json({success:true});
    })
})

router.post('/',(req,res)=>{
    const newObj =req.body;
    //console.log(newObj);
    var tweet = new Tweet(newObj);
    tweet.save(err=>{
        if(err) throw err;
        res.json({success:true});
    });
});

router.put('/:tweetId',(req,res)=>{
    const updatedObj = req.body;
    Tweet.findOneAndUpdate({_id:req.params.tweetId},updatedObj,(err,doc)=>{
        if (err)  throw err;
        res.json({success:true});
    })
});

//like on tweet post

router.put('/:tweetId/like',(req,res)=>{
    const userObj = mongoose.Types.ObjectId(req.body.user);
    //console.log(user);
    Tweet.updateOne({_id:req.params.tweetId,'likes.user':{$ne:userObj}},{$push:{likes:{'user':userObj}}},(err,doc)=>{
        if(err) throw err;
        res.json({success:true});
    })
})

//dislike on tweet post

router.delete('/:tweetId/like',(req,res)=>{
    const userObj = mongoose.Types.ObjectId(req.body.user);
    //console.log(req.body);
    Tweet.updateOne({_id:req.params.tweetId,'likes.user':{$eq:userObj}},{$pull:{likes:{'user':userObj}}},(err,doc)=>{
        if(err) throw err;
        res.json({success:true});
    })
});

//comment on post
router.put('/:tweetId/comment',(req,res)=>{
    const comment = req.body;
    //console.log(comment);
    try {
        Tweet.updateOne({_id:req.params.tweetId},{$push:{comments:comment}},(err,doc)=>{
            res.json({success:true});
        });
    } catch (e) {
        console.log(e);
    }


//delete comment from post
    router.delete('/:tweetId/comment/:commentId',(req,res)=>{
        console.log(req.params.commentId);
        Tweet.updateOne({_id:req.params.tweetId},{$pull:{comments:{'_id':req.params.commentId}}},(err,doc)=>{
            if(err) throw err;
            res.json({success:true});
        });
    });
});


//like inside post comments

router.put('/:tweetId/comment/:commentId/like',(req,res)=>{
    const userObj = mongoose.Types.ObjectId(req.body.user);
    //console.log(user);
    Tweet.updateOne({'_id':req.params.tweetId,'comments._id':req.params.commentId},{$addToSet:{'comments.$.likes':userObj}},(err,doc)=>{
        if(err) throw err;
        res.json({success:true});
    })
});

//dislike inside post comments
router.delete('/:tweetId/comment/:commentId/like',(req,res)=>{
    const userObj = mongoose.Types.ObjectId(req.body.user);
    //console.log(user);
    Tweet.updateOne({'_id':req.params.tweetId,'comments._id':req.params.commentId},{$pull:{'comments.$.likes':userObj}},(err,doc)=>{
        if(err) throw err;
        res.json({success:true});
    })
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

    });
});


module.exports = router;
