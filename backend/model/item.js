const mongoose=require('mongoose');


const itemSchema=mongoose.Schema({
    image:{type:String},
    name:{type:String},
    category:{type:String},
    price:{type:String},
    stock:{type:Number}
});

const item=mongoose.model('items',itemSchema);

module.exports=item;