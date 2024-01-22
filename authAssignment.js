const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

const app = express();

const ALL_USERS= [
    {
        username: "rachit@gmail.com",
        password: "123",
        name: "rachit gurjar"
    },
     {
        username: "harsh@gmail.com",
        passsword: "123321",
        name: "harsh gurjar"
     },
     {
        username: "sejal@gmail.com",
        password: "123321",
        name: "sejal kaur"
     }
];

function userExists(username, password){
    // return true if user exists in ALL_USERS array
    for(let i = 0; i < ALL_USERS.length; i++){
        if(ALL_USERS[i].username === username && ALL_USERS[i].password === password){
            return true;
        }
    }
    return false;
}

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        res.status(403).json({
            msg: "user doesn't exists in our database"
        })
    }

    var token = jwt.sign({username: username}, "sshfjsbjbf");
    return res.json({
        token
    });
})

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
    } catch(err) {
        return res.status(403).json({
            msg: "Invalid token"
        });
    }
});

app.listen(3000);

