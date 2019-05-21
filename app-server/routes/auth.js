var express = require('express');
var router = express.Router();
var User = require('../models/user');

var bcrypt = require('bcrypt');

const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

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


module.exports = router;
