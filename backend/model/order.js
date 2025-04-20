const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    customer:{type:mongoose.Schema.Types.ObjectId,ref:'Users'},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'items'},
    quantity:{type:Number},
    totalAmount:{type:Number},
    orderStatus:{type:String,default:'pending'},
    orderDate:{type:Date,default:Date.now}
})

const order=mongoose.model('Orders',orderSchema);

module.exports=order;