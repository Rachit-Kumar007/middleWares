const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

const app = express();
app.use(express.json());

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
    let userExists = false;
    for(let i = 0; i < ALL_USERS.length; i++){
        if(ALL_USERS[i].username == username && ALL_USERS[i].password == password){
            userExists = true;
            break;
        }
    }
    return userExists;

    //solve it using find method
    // const user = ALL_USERS.find((user) => {
    //     return user.username == username && user.password == password;
    // });
}

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        return res.status(403).json({
            msg: "user doesn't exists in our in memory database"
        })
    }

    var token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token
    });
})

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        return res.json({
            users: ALL_USERS
        });
    } catch(err) {
        return res.status(403).json({
            msg: "Invalid token"
        });
    }
});

app.listen(3010);

