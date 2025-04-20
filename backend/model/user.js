const mongoose=require('mongoose');


const usermodel=mongoose.Schema({
    name:{type:String},
    password:{type:String},
    mail:{type:String},
    mobile_num:{type:Number},
    role:{type:String,default:'customer'}
})

const userdata=mongoose.model('Users',usermodel);

module.exports=userdata;