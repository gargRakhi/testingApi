const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

app.post("/login", (req, res) => {
    let obj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.pass,
    };
    fs.readFile("user.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error', error: 'File read error' });
        } else {
            data = JSON.parse(data);
            let status = 0;
            data.forEach((element) => {
                if (element.email == obj.email) {
                    if (element.name == obj.name && element.password == obj.password) {
                        status = 1;
                    } else {
                        status = 2;
                    }
                }
            })
            if (status == 0) {
                res.status(404).json({ message: 'Not found', error: `user not found with ${obj.email}` });
            }
            if (status == 1) {
                res.status(200).json({ message: 'Success', data: obj });
            }
            if (status == 2) {
                res.status(401).json({ message: 'Invalid credentials', error: 'Authentication failed', });
            }
        }
    })
})

app.post("/signup", (req, res) => {
    let obj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.pass,
    };
    fs.readFile("user.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error', error: 'File read error' });
        } else {
            data = JSON.parse(data);
            let status = 0;
            data.forEach((element) => {
                if (element.email == obj.email) {
                    status = 1;
                }
            })
            if (status == 0) {
                data.push(obj);
                fs.writeFileSync("user.json", JSON.stringify(data));
                res.status(200).json({ message: 'Success', data: obj })
            }
            if (status == 1) {
                res.status(409).json({ message: 'Email already exists', error: 'User with this email is already registered. Please log in instead.', });
            }
        }
    })
})
app.get("/product",(req,res)=>{
    fs.readFile("product.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error', error: 'File read error' });
        } else {
            data = JSON.parse(data);
           res.status(200).json({message: 'Success',data});
        }
    })
})
app.get("/search/:name",(req,res)=>{
    fs.readFile("product.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error', error: 'File read error' });
        } else {
            data = JSON.parse(data);
           let arr = data.filter((element )=>{
            if(element.productName == req.params.name) return true;
           })
           res.status(200).json({message: 'Success', data : arr});
        }
    })
})
app.listen(3000);
