const express = require("express");
const zod = require("zod"); // calling the zod library like express
const app = express();

app.use(express.json()); // this is actually a midlleware which makes body accessible to the get function

// app.get("/health-checkup", (req, res) => {
//     const kidneyId = req.query.kidneyId;
//     const username = req.headers.username;
//     const password = req.headers.password;

//     if(username != "Rachit" || password != "pass"){
//         res.status(403).json({
//             msg: "User doesnt exists"
//         });
//         return;
//     }  // we can actually create a middle like this that checks the same condition before the get function 

//     // flow goes like this:  user calls get() -> middleware1 -> middleware2 -> middlewareN -> get method
//     // if any middleware thinks the request is not satisfying the condition then the middleware itself send the get request back with status code of 400's

//     if(kidneyId != 1 &&  kidneyId != 2){
//         res.status(411).json({
//             msg: "This guy is an alien"
//         });
//         return;
//     }

//     res.json("Your kidneys are healthy");
// })

// lets see the middlewares now

// function userMiddleware(req, res, next) {
//     if(req.username != "Rachit" || req.password != "pass"){
//         res.status(403).json({
//             msg: "userMiddleware send this request back"
//         })
//     }
//     else{
//         next();
//     }
// };

// function kidneyMiddleware(req, res, next) {
//     if(req.kidneyID != 1 && req.kidneyID != 2){
//         res.status(403).json({
//             msg: "This guy is an alien"
//         })
//     }
//     else{
//         next();
//     }
// }

// app.get("/health-checkup", userMiddleware, kidneyMiddleware, (req, res)=>{
//     res.send("Your kidneys are healthy");
// })

// app.get("/health-check", userMiddleware, kidneyMiddleware, (req, res)=>{
//     res.send("Your kidneys are healthy");
// })

// app.get("/health-check", userMiddleware, (req, res)=>{
//     res.send("Your heart is healthy");
// })  example of middlewares


const schema = zod.array(zod.number());


app.post("/health-checkup", (req, res) => {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    if(!response.success){
        return res.status(411).json({
            msg: "invalid input expected an array"
        })
    }
    else{
        res.status(200).json({
            msg: `you have ${kidneys.length} kidneys`
        })

    }
})

//global catch -> if any error occurs this catch will take care of that stuff



app.listen(3005);