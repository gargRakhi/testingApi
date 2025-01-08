const express  = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("landing page");
})
app.get("/about",(req,res)=>{
    res.send("about page");
})

app.listen(3000);