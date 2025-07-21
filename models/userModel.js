const mongoose = require("mongoose");

//define the schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String, 
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        //role space is capped now
        //can only be of the enum values
        type:String,
        enum:["Admin", "Student", "Visitor"]
    }
})

//export the schema
module.exports = mongoose.model("user", userSchema);