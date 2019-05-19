var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var tweetsRouter = require('./routes/tweets');


// connect to mongoose
mongoose.connect('mongodb+srv://huygaa:pass@cluster0-efgxs.mongodb.net/test?retryWrites=true',{useNewUrlParser:true});
var db = mongoose.connection;
var Tweet = require('./models/tweet');

app.get('/',(req,res)=>{
    res.send('Please use /api/tweet or /api/user');
});
 
app.use('/tweets', tweetsRouter);


app.listen(3000,()=>{console.log('running on port 3000')});
