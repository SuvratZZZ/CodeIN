import jwt from 'jsonwebtoken';
import { db } from '../libs/db.js';

export const authMid = async (req,res,nex)=>{
    // console.log("authMid", req.cookies);
    try{
            const token = req.cookies.jwt;
            
            const decoded = jwt.verify(token,process.env.JWT_S);
            
            const existing = await db.User.findUnique({
                where:{
                    id:decoded.id
                },
                select:{
                    id:true,
                    email:true,
                    name:true,
                    role:true,
                    image:true
                }
            })

            if(!existing){
                return res.status(401).json({
                    success : false,
                    error : "user not found"
                })
            }

            req.user=existing;
            nex();
        }
        catch(e){
            console.error("error auth",e);
            res.status(500).json({
                success:false,
                message:"error auth"
            })
        }
}

export const checkAdmin  = async(req , res , next)=>{
    try {
        const userId = req.user.id;
        
        const user = await db.user.findUnique({
            where:{
                id:userId
            },
            select:{
                role:true
            }
        })

        if(!user || user.role !== "ADMIN"){
            return res.status(403).json({
                message:"Access denied - Admins only"
            })
        }

        next();
    } catch (error) {
        console.error("Error checking admin role:", error);
        res.status(500).json({message:"Error checking admin role"});
    }
}