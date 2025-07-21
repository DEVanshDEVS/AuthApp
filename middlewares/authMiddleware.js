//Middlewares:

const jwt = require("jsonwebtoken");
require("dotenv").config();

//AUTHENTICATION:
//auth middleware
//NEXt -> this call assigns the next middleware which the route needs to go to
exports.auth = (req,res,next) =>{
    try{
        //extract jwt token from body
        //PENDING : other ways to fetch token
        const token = req.body.token;

        if(!token){
            return res.status(400).json({
                success:false,
                message:'Missing token',
            });
        }

        //verify token for AUTHENTICATION:
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            //why this?
            //Here the payload is stored
            req.user = payload;
        } catch(error){
            return res.status(400).json({
                success:false,
                message:'Token is invalid',
            });
        }
        next();

    } catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while verifying the token',
        });
    }
}

//AUTHORIZATION:
//isStudent middleware
exports.isStudent = (req, res, next) =>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for STUDENTS',
            });
            next();
        }
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role is not matching',
        });
    }
}

//isAdmin middleware
exports.isAdmin = (req, res, next) =>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for ADMINS',
            });
        }
    } catch(error){
        return res.status(500).json({
            success:false, 
            message:'User role is not matching',
        });
    }
}