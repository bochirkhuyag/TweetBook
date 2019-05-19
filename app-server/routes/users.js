var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

//get users
router.get('/', function(req, res) {
    User.find({},(err,users)=>{
        res.json(users);
    })
});
//select one user by id
router.get('/:id',(req,res)=>{
    const objId = new mongoose.Types.ObjectId(req.params.id);
    User.findOne({'_id':objId},(err,user)=>{
        res.json(user);
    })
})

//delete user by id
router.delete('/:userId',(req,res)=>{
    const objId = new mongoose.Types.ObjectId(req.params.userId);
    User.findByIdAndDelete({_id:objId},(err,doc)=>{
        if (err) throw err;
        res.json({success:true});
    })
})
//add user
router.post('/',(req,res)=>{
    const newObj =req.body;
    //console.log(newObj);
    var user = new User(newObj);
    //console.log(user);
    user.save(err=>{
        if(err) throw err;
        res.json({success:true});
    });
});

//update user
router.put('/:userId',(req,res)=>{
    const updatedObj = req.body;
    User.findOneAndUpdate({_id:req.params.userId},updatedObj,(err,doc)=>{
        if (err)  throw err;
        res.json({success:true});
    })
});

//follow user
/*
router.post('/:userId/follow/:userToFollow',(req,res)=>{
    const user = req.params.userIdToFollow;
    Tweet.updateOne({_id:req.params.userId,'followers._id':{$ne:user._id}},{$push:{followers:{'_id':user._id,'userName':user.userName}}},(err,doc)=>{
        if(err) throw err;
        res.json({success:true});
    })
})
*/

module.exports = router;
