//main logic thinking:

const bcrypt = require("bcrypt");//lib for password hashsing
const User = require("../models/userModel");


//signup route handler
exports.signup = async (req, res) =>{
    try{
        //get data
        const {name, email, password, role} = req.body
        //if user already exists:
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.this.status(400).json({
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
            while(attempts>=maxAttempts){
                try{
                    //success
                    hashedPassword = await bycrypt.hash(password, 10);//10 rounds are optimal
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
            name, email, password, role
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