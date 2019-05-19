var express = require('express');
var router = express.Router();
var Tweet = require('../models/tweet');

//get tweets 
router.get('/', function(req, res, next) {
  Tweet.find({},(err,users)=>{
    res.json(users);
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

module.exports = router;
