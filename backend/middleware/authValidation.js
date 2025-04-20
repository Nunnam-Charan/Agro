const jwt=require('jsonwebtoken');


const Validation= (roles)=>{
       return (req,res,next)=>{ const Token=req.headers.authorization;

        if(!Token){
            console.log("token was messing");
            res.json({message:'token was messing'});
        }

        const newToken=Token.split(' ')[1];

        jwt.verify(newToken,'tokensecretkey',(err,user)=>{
            if(!err){
                req.user=user;
                if(roles.includes(user.role)){
                  return  next();
                }
                res.json({message:"you were unauthorized"})
            }
            res.json({message:err.message});
        })
    }  
}




module.exports={Validation};