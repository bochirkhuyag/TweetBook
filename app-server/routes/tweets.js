var express = require('express');
var router = express.Router();
var Tweet = require('../models/tweet');
var mongoose = require('mongoose');
var User = require('../models/user')

//get tweets
router.get('/', function(req, res) {
    Tweet.find({}).sort({'createdDate':-1}).exec((err,tweets)=>{
        if(tweets.length>0) res.json(tweets);
        else res.json({success:false});
    })
});

//select one tweet by id
router.get('/:id',(req,res)=>{
    const objId = new mongoose.Types.ObjectId(req.params.id);

    Tweet.findOne({'_id':objId}).sort({'createdDate':-1}).exec((err,tweet)=>{
        res.json(tweet);
    })
});

//select tweets by user
router.get('/self/:userId', function (req, res) {
   Tweet.find({createdUser: {_id: req.params.id}}).sort({'createdDate':-1}).exec((err, tweets) => {
        if(tweets.length>0) res.json(tweets);
        else res.json({success:false});
    })
});

//select by user
router.get('/user/:userId', function(req, res) {
    const objId = new mongoose.Types.ObjectId(req.params.id);
    const userArray=[];
    User.find({_id:objId},{followers:1,_id:0}).sort({'createdDate':-1}).exec((err,result)=>{
        if(result.followers !== undefined && result.followers.length!=0) userArray.push(result.followers);
        console.log(result);
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
    const user = req.body;
    //console.log(user);
    Tweet.updateOne({_id:req.params.tweetId,'likes.userId':{$ne:user.userId}},{$push:{likes:{'userName':user.userName,'userId':user.userId}}},(err,doc)=>{
        if(err) throw err;
        res.json({success:true});
    })
})

//dislike on tweet post

router.delete('/:tweetId/like',(req,res)=>{
    const user = req.body;
    //console.log(req.body);
    Tweet.updateOne({_id:req.params.tweetId,'likes.userId':{$eq:user.userId}},{$pull:{likes:{'userName':user.userName,'userId':userId}}},(err,doc)=>{
        if(err) throw err;
        res.json({success:true});
    })
});

//comment on post
router.put('/:tweetId/comment',(req,res)=>{
    const comment = req.body;
    //console.log(comment);
    Tweet.updateOne({_id:req.params.tweetId},{$push:{comments:comment}},(err,doc)=>{
        if(err) throw err;
        res.json({success:true});
    });

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
    const user = req.body;
    console.log(user);
    Tweet.updateOne({'_id':req.params.tweetId,'comments._id':req.params.commentId,'comments.likes.userId':{$ne:user.userId}},{$push:{'comments.$.likes':{'userName':user.userName,'userId':user.userId}}},(err,doc)=>{
        if(err) throw err;
        res.json({success:true});
    })
});

//dislike inside post comments
router.delete('/:tweetId/comment/:commentId/like',(req,res)=>{
    const user = req.body;
    console.log(user);
    Tweet.updateOne({'_id':req.params.tweetId,'comments._id':req.params.commentId,'comments.likes.userId':{$eq:user.userId}},{$pull:{'comments.$.likes':{'userName':user.userName,'userId':user.userId}}},(err,doc)=>{
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
    const id = req.params.userId;
    Tweet.find({ 'createdUser._id':id }).countDocuments().exec().then((doc)=>{
        stat.tweets=doc;
        //total likes for all posts
        Tweet.aggregate([
            {$match:{'createdUser._id':mongoose.Types.ObjectId(id)}},
            {$unwind:{path:'$likes'}},
            {$group:{_id:{'likes':'$likes._id'},count:{$sum:1}}},
            {$group:{_id:null,'total':{$sum:'$count'}}},
            {$project:{_id:0,total:1}}
        ],(err,result)=>{
            if (err) throw err;
            if(result.length !=0) stat.likes = result[0].total;
            User.aggregate([
                {$match:{_id:mongoose.Types.ObjectId(id)}},
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
