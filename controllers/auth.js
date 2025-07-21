//main logic thinking:

const bcrypt = require("bcrypt");//lib for password hashsing
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler
exports.signup = async (req, res) =>{
    try{
        //get data
        const {name, email, password, role} = req.body
        //if user already exists:
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists'
            });
        }
        //secures passrword:
        let hashedPassword;
        try{
            //here we are using retry strat to try to hash 
            //the password thrice before throwing an error
            let attempts = 0;
            let maxAttempts = 3;
            while(attempts <= maxAttempts){
                try{
                    //success
                    hashedPassword = await bcrypt.hash(password, 10);//10 rounds are optimal
                    break;
                }
                catch(error){
                    attempts++;
                    //throw err at max attempts
                    if(attempts>=maxAttempts) throw error;
                }
            }
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:'Error in hashing password'
            })
        }

        //create entry for User
        const user = await User.create({
            name, email, password: hashedPassword, role
        })
        return res.status(200).json({
            success:true,
            message:'user has been created successfully',
        })
    }


    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cant be registered. Please try again later.',
        })
    }
}

//login route handler
exports.login = async (req, res) =>{
    try{
        //data fetch
        const {email, password} = req.body
        //(small)validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Enter all fields',
            });
        }
        //check for reg user
        let user = await User.findOne({email});
        if(!user){
            //if not a reg user 
            return res.status(400).json({
                success:false,
                message:'User is not registered',
            });  
        }

        //payload to be used for jwt token creation
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };

    //JWT TOKEN:
        //verify password:
        if(await bcrypt.compare(password, user.password)){
            //password matched
            //CREATE JWT TOKEN
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });
            //here we are sending the token back to the user in COOKIES
            user = user.toObject();
            user.token = token;
            //removing password from user object(not DB) since it will compromise security
            user.password = undefined; //hide user password
            //OPTIONS ARE FEATURES OF THE COOKIES
            //THAT ARE DEFINED BY US
            const options = {
                //Expires in: 3 days
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            };

            //send the cookies as a response:
            return res.cookie("token", token, options).status(200).json({
                success:true, 
                token,
                user,
                message:'User logged in successfully',
            });
        }

        else{
            //password didnt matched
            return res.status(403).json({
                success:false,
                message:'Password incorrect',
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });
    }
}