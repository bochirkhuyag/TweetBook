var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens


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
        if(err) res.send(err);
        res.json({success:true});
    });
});

//register user
router.post('/register',(req,res)=>{
    const newObj =req.body;
    //console.log(newObj);
    var user = new User(newObj);
    //console.log(user);
    user.save(err=>{
        if(err) res.send({"error": "User already existed."});
        else {
            res.json({token:createToken(user), user:user});  
        }
        
    });
});
//Login
router.post('/login',(req,res)=>{

    User.findOne({'userName':req.body.userName},(err,user)=>{
        if(err) {
            res.send({"error": "User does not exist."});
        }
        if(user) {           
            bcrypt.compare(req.body.password, user.password, (err, response)=>{
                if(response) {
                    res.json({token:createToken(user), user:user});                    
                } else {
                    console.log('login err');
                    res.send({"error": "Password is incorrect."});
                }                
            });
        }

    })
});

function createToken(user) {
    const SECRET = 'SECRET';
    const payload = {user: user.id};
    const token = jwt.sign(payload, SECRET, {
        expiresIn: 1440000 // expires in 24 
        });

    return token;
};

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
