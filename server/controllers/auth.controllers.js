import { db } from "../libs/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req,res)=>{
    const {email,password,name} = req.body;

    try{
        const existing = await db.User.findUnique({
            where:{
                email
            }
        })

        if(existing){
            return res.status(400).json({
                success : false,
                error : "user alredy exist"
            })
        }

        const hashedPass = await bcrypt.hash(password,10);

        const newUser = await db.User.create({
            data:{
                email,
                password:hashedPass,
                name
            }
        })

        const token = jwt.sign({id:newUser.id}, process.env.JWT_S,{
            expiresIn : "7d"
        });

        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_E !== "development",
            maxAge:7*24*60*60*1000
        });

        res.status(201).json({
            success:true,
            message:"User Created",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                image:newUser.image
            }
        })
    }
    catch(e){
        console.error("error creating user",e);
        res.status(500).json({
            success:false,
            message:"error creating user"
        })
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const existing = await db.User.findUnique({
            where:{
                email
            }
        })

        if(existing){
            return res.status(401).json({
                success : false,
                error : "user not found"
            })
        }
        
        const isMatch = await bcrypt.compare(password,existing.password);
        
        if(isMatch){
            return res.status(401).json({
                success : false,
                error : "wrong cred"
            })
        }

        const token = jwt.sign({id:newUser.id}, process.env.JWT_S,{
            expiresIn : "7d"
        });

        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_E !== "development",
            maxAge:7*24*60*60*1000
        });

        res.status(201).json({
            success:true,
            message:"User logedin",
            user:{
                id:existing.id,
                email:existing.email,
                name:existing.name,
                role:existing.role,
                image:existing.image
            }
        })
    }
    catch(e){
        console.error("error login",e);
        res.status(500).json({
            success:false,
            message:"error login"
        })
    }
}

export const logout = async (req,res)=>{
    try{
        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_E !== "development",
        });
        
        res.status(204).json({
            success:true,
            message:"User loged out",
        })
    }
    catch(e){
        console.error("error logout",e);
        res.status(500).json({
            success:false,
            message:"error logout"
        })
    }
}

export const check = async (req,res)=>{
    try{
        res.status(201).json({
            success:true,
            message:"User checked",
            user:req.user
        })
    }
    catch(e){
        console.error("error checking",e);
        res.status(500).json({
            success:false,
            message:"error checking"
        })
    }
}