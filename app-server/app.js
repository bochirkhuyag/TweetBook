var express = require('express');
var app=express();
var mongoose = require('mongoose');
require('dotenv').config()

var tweetsRouter = require('./routes/tweets');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

const cors = require('cors');
const connStr = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'/'+process.env.DB_COLLECTION+'?retryWrites=true';
// connect to mongoose
console.log(process.env.DB_HOST);
console.log(connStr);
mongoose.connect(connStr,{useNewUrlParser:true});

var db = mongoose.connection;

//check DB connection
db.once('open', function(){
    console.log("Connected to mongoDB");
});

db.on('error', (err) =>{
    console.log("DB Error" + err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('upload'))

app.get('/', (req,res)=>{
    res.send('Please use /api/tweets or /api/users');
});
app.use('/api/users',usersRouter);
app.use('/api/tweets',tweetsRouter);
app.use('/api/auth',authRouter);

app.listen(3000,()=>{console.log('running on port 3000')});
