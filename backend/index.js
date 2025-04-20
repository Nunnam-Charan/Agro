const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const router=require('./router/router.js');

const app=express();

app.use(express.json());
app.use(cors());


const dburl="mongodb+srv://charan:charan@cluster0.jjhsszi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dburl,{})
.then(()=>{console.log("Connected to the mongodb");})
.catch((error)=>{console.log(`error message:${error}`);})


app.use('/api',router);

app.listen(5000,()=>{
    console.log("connected to the port number 5000");
});


