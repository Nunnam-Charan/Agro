const userdata=require('../model/user.js');
const jwt=require('jsonwebtoken');


const login= async(req,res)=>{
    const {name,password}=req.body;
        console.log("hello");
      
    try{
        const getUser=await userdata.findOne({name, password});


        if(getUser){
            const token=jwt.sign({name:getUser.name,role:getUser.role,id:getUser._id},'tokensecretkey');
            console.log(getUser.name);
            return res.json({token,getUser});
        }
        else{
            return res.json({message:"user not found"});
        }

        
    }
    catch(error){
        return res.json({message:error.message});
    }


}

const register= async (req,res)=>{
    const userdetails=req.body;
    console.log(userdetails);
   try
   {
        
        const newUser=new userdata(userdetails)
        await newUser.save();
        res.json({message:'user details saved successfully'});
   }
   catch(error){
    return res.json({message:error.message});
   }

}


module.exports={login,register};