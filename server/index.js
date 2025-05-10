import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("codein platform");
})

app.use

app.listen(process.env.PORT,()=>{
    console.log("server runnning on : ",process.env.PORT);
})