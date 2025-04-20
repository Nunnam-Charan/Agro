const itemDetails=require('../model/item.js');
const orderdata=require('../model/order.js');
const userdata=require('../model/user.js');
const nodemailer = require("nodemailer");




const getProducts=async (req,res)=>{
    console.log("get products");
        try{
            const items= await itemDetails.find();
            console.log(items);
            return res.json({items,message:'get Products'});
        }
        catch(error){
            return res.json({message:error.message});
        }
}


const sendMail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "2200031397cseh@gmail.com",
        pass: "hfgw adul wjaa tvkf", 
      },
    });
  
    const mailOptions = {
      from: "2200031397cseh@gmail.com",
      to,
      subject,
      text,
    };
  
    return await transporter.sendMail(mailOptions);
  };
  
  const orders = async (req, res) => {
    const orderDetails = req.body;
    const user = req.user;
  
    try {
      orderDetails['customer'] = user.id;
  
      const custumerDetails = await userdata.findOne({ _id: user.id });
  
      const newOrder = new orderdata(orderDetails);
      await newOrder.save();
  
      const product = await itemDetails.findOne({ _id: orderDetails.product });
      const newStock = product.stock - orderDetails.quantity;
      await itemDetails.findByIdAndUpdate(orderDetails.product, { stock: newStock });
  
      const mailText = `
        Hi ${custumerDetails.name},
  
        Thank you for your order!
        Product: ${product.name}
        Quantity: ${orderDetails.quantity}
        Total Price: ₹${orderDetails.quantity * product.price}
  
        We will notify you when it's shipped.
  
        Regards,
        Your Company
      `;
  
      await sendMail('charannunnam@gmail.com', "Your Order Confirmation", mailText);
  
      res.json({ message: "Order successfully placed and confirmation email sent." });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const orderDetailsById=async (req,res)=>{
        const {id}=req.param;

        try{
            const orders=await orderdata.findOne({_id:id});
            res.json({orders});
        }
        catch(error){
            res.json({message:error.message});
        }
}

const viewOrder=async (req,res)=>{

    try{
        console.log("before");
        const orders=await orderdata.find();
        console.log("vieworder")
        return res.json({orders});
    }
    catch(error){
        return res.json({message:error.message});
    }
}

const updateStatus= async (req,res)=>{
        const {id}=req.params;
        const {orderStatus}=req.body;
    try{
        
        await orderdata.findByIdAndUpdate(id,{orderStatus});
        return res.json({message:'Status updated successfully'});

    }
    catch(error){
        res.json({message:error.message});
    }
}


const addProduct=async (req,res)=>{
        const productDetials=req.body;
        console.log(productDetials);
        try{
            const product=new itemDetails(productDetials);
           await product.save()

           res.json({message:'product add successfully'})
        }
        catch(error){
            res.json({message:error.message});
        }
}

const updateProduct= async (req,res)=>{
    const {price,stock}=req.body;
    const {id}=req.params;

    try{
        console.log("start");
        await itemDetails.findByIdAndUpdate(id,{price,stock});
        console.log('end');
        res.json({message:'updated Successfully'})

    }
    catch(error){
        res.json({message:error.message});
    }

}

const deleteProduct= async (req,res)=>{
    const id=req.param;

    try{

        await itemDetails.deleteOne({id});
        res.json({message:'product deleted success fully'});
    }
    catch(error){
        res.json({message:error.message});
    }

}

const getYourOrder=async(req,res)=>{
    const user=req.user;
    try{

        const orders=await orderdata.find({customer:user.id});
        return res.json({orders});

    }
    catch(error){
        return res.json({message:error.message});
    }
}



module.exports={getProducts,orders,orderDetailsById,viewOrder,updateStatus,addProduct,updateProduct,deleteProduct,getYourOrder};