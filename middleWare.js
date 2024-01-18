const express = require("express");

const app = express();

app.get("/health-checkup", (req, res) => {
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    if(username != "Rachit" || password != "pass"){
        res.status(403).json({
            msg: "User doesnt exists"
        });
        return;
    }

    if(kidneyId != 1 &&  kidneyId != 2){
        res.status(411).json({
            msg: "This guy is an alien"
        });
        return;
    }

    res.json("Your kidneys are healthy");
})


app.listen(3005);