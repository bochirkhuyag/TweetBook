var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const multer = require('multer');
var cookieParser = require('cookie-parser');

const verifyToken = require('../middleware/verifyToken');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload/photo');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage }).single('image');

router.use(verifyToken());
router.use(cookieParser());

router.route("/profile").post(function (req, res, next) {
    console.log('working');
    upload(req, res, function (err) {
        if (err) {
            console.log('Error Occured' + err);
            return;
        }
        console.log('Photo Uploaded' + req.file.path);
        const filePath = "/photo/" + req.file.filename;
        const updatedObj = {$set:{picture:filePath}};
        //req.params.userId
        console.log("req.cookies.uid " + req.cookies.uid);
        const objId = new mongoose.Types.ObjectId(req.cookies.uid);
        User.findOneAndUpdate({_id:objId},updatedObj,(err,doc)=>{
            if (err)  res.json({error:err});
            res.json({success:true, filePath:filePath});
        })
        //res.json({success:true});
    })

});
router.route("/post").post(function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.log('Error Occured' + err);
            return;
        }
        console.log('Photo Uploaded' + req.file.path);
        const filePath = "/photo/" + req.file.filename;
        res.json({success:true, filePath:filePath});
    })

});

module.exports = router;
