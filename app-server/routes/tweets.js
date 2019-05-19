var express = require('express');
var router = express.Router();
var Tweet = require('../models/tweet');
var mongoose = require('mongoose');

//get tweets 
router.get('/', function(req, res) {
  Tweet.find({},(err,tweets)=>{
    res.json(tweets);
  })
});
//select one tweet by id
router.get('/:id',(req,res)=>{
  const objId = new mongoose.Types.ObjectId(req.params.id);
  Tweet.findOne({'_id':objId},(err,tweet)=>{
    res.json(tweet);
  })
})
//select by user
router.get('/user/:userName', function(req, res) {
      Tweet.find({'createdUser.userName':req.params.userName},(err,tweets)=>{
        res.json(tweets);
      })
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
    Tweet.updateOne({_id:req.params.tweetId,'likes.userName':{$ne:user.userName}},{$push:{likes:{'userName':user.userName,'userId':user.userId}}},(err,doc)=>{
      if(err) throw err;
      res.json({success:true});
    })
})

//dislike on tweet post

router.delete('/:tweetId/like',(req,res)=>{
  const user = req.body;
  //console.log(req.body);
    Tweet.updateOne({_id:req.params.tweetId,'likes.userName':{$eq:user.userName}},{$pull:{likes:{'userName':user.userName}}},(err,doc)=>{
      if(err) throw err;
      res.json({success:true});
    })
});

//comment on post
router.put('/:tweetId/comment',(req,res)=>{
  const comment = req.body;
  console.log(comment);
  Tweet.updateOne({_id:req.params.tweetId},{$push:{comments:comment}},(err,doc)=>{
    if(err) throw err;
    res.json({success:true});
  });

//delete comment from post 
router.delete('/:tweetId/comment/:commentId',(req,res)=>{
  console.log(req.params.tweetId);
  console.log(req.params.commentId);
  Tweet.updateOne({_id:req.params.tweetId},{$pull:{comments:{'_id':req.params.commentId}}},(err,doc)=>{
    if(err) throw err;
    res.json({success:true});
  });
});

})






module.exports = router;
