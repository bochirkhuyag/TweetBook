var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var tweetSchema = require('../models/tweet');


var tweet = mongoose.model('tweet',tweetSchema);

//get tweets 

router.get('/', function(req, res, next) {
   tweet.getTweets = function(callback,limit){
        tweet.find(callback).limit(limit);
    };

  res.render('index', { title: 'Express' });
});

module.exports = router;
