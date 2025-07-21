const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

//import and mount routes
const user = require("./routes/user");
app.use("/api/v1", user);
 
app.listen(PORT,() =>{
    console.log(`The App is running on PORT no. ${PORT}`);
});

app.get("/", (req, res) =>{
    res.send("<h1>THIS IS HOMEPAGE</h1>");
});