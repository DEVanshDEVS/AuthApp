const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/auth");
const {auth, isStudent, isAdmin} = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/signup", signup);

//protected routes(can be accessed by students or admin only):
//here we need to add path, middlewares and callback function 
//Testing route with single middleware
router.get("/test", auth, (req, res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for Testing',
    });
});
//middleware for student route
router.get("/student", auth, isStudent, (req, res) =>{
    res.json({
        success:true,
        message:'Welcome to the protected route for Students',
    });
});
//middleware for Admin route
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});

module.exports = router;