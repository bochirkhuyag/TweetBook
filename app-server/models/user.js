var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
//user schema
var userSchema = new mongoose.Schema({ 
    userName:{type:String,index:true,unique:true},
    password:{type:String,required:true},
    picture:{type:String},
    createdDate:{type:Date,default:new Date.now()},
    followers: [{userName:String, followedAt:Date}],
    email:{type:String,required:true}
});

//userSchema index
userSchema.index({userName:1,email:1});

//hash the password
userSchema.pre('save',(next)=>{
   bcrypt.hash(this.password,10,(err,hash)=>{
        this.password=hash;
   });
});

module.exports=mongoose.model('users',userSchema);