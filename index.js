var express = require("express");
var bodyparser = require("body-parser");
const mongoose = require("mongoose");

var app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/login");
const db = mongoose.connection;
db.on("error", error=> console.log(error));
db.on("open", ()=> console.log("Connection Established"));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.get("/", function(req, res){
    res.send("Hello Welcome ");
    res.end();
});

app.use("/user",require("./routes/login"));

app.listen(8081, function(){
    console.log("Node Server Started");
})



