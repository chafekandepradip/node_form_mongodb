var express = require("express");
var bodyparser = require("body-parser");
const User = require("../models/Login");
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let user = new User();
    user.name = body.data.name;
    user.email = body.data.email;
    user.password = body.data.password;
    // admin.stock = body.data.stock;
    user.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/register", async(req, res)=>{
    let body = req.body;
    let user = new User();
    user.name = body.data.name;
    user.email = body.data.email;
    user.password = body.data.password;
    user.save().then(result=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, err=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    });
    });

router.post("/login", async(req, res)=>{
    let body = req.body;
    if(body.data.email == "admin@gmail.com" && body.data.password == "admin")
    {
        let data = {
            data: {
              status: "success",
              usertype:"admin"
            },
          };
          res.end(JSON.stringify(data));
    }
    else{
        let user = new User();
        try{
            const user = await User.findOne(
                {
                    email: body.data.email
                }
            );
            if(user == null)
            {
                let data = {
                    data: {
                    status: "failed",
                    message: "Invalid email",
                    },
                };
                res.end(JSON.stringify(data));
            }
            else{
                const inputPassword = body.data.password;
                const originalPassword = user.password;
                if(originalPassword != inputPassword)
                {
                    let data = {
                        data: {
                        status: "failed",
                        message: "Invalid password",
                        },
                    };
                    res.end(JSON.stringify(data));
                }            
               
            }
        }catch(err){
            let data = {
                data: {
                status: "failed",
                message: "something went wrong",
                },
            };
            res.end(JSON.stringify(data));
        }
    }
});

router.post("/list", async(req, res)=>{
    let users = await User.find();
    res.json({data:users});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let user = await User.findById(body.data.id);
    res.json({data:user});
});

router.post("/updatestatus", async(req, res)=>{
    let body = req.body;
    let user = await User.findById(body.data.id);
    user.status = body.data.status;
    await user.save();
    res.json({data:user});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await User.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));  
});
module.exports = router;



















