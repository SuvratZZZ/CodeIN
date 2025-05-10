import jwt from 'jsonwebtoken';

export const authMid = async (req,res,nex)=>{
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

            if(existing){
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
