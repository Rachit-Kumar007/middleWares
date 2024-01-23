const express = require('express');
const mongoose = require('mongoose'); // a library to connect to mongoDB
const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

mongoose.connect(
    "mongodb+srv://rachitPanwar:12345678Aa@cluster0.nnklcjb.mongodb.net/userAppNew",
)


const User = mongoose.model("Users", {
    name: String,
    username: String,
    password: String,
});



const app = express();
app.use(express.json());

// function userExists(username, password){
//     //should check in the database
// }

//CRUD: create, read, update, delete
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({username: username});
    if(existingUser){
        return res.status(400).json({
            msg: "user already exists"
        })
    }
    else{
        const user = new User({
            name: "rachit gurjar",
            username: "rachitgurjar@gmail.com",
            password: "123321"
        });
        user.save();
        return res.json({
            msg: "user created successfully"
        })
    }

})

app.listen(4000);