const { User } = require("../db/index")
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
function userMiddleware(req, res, next) {
    // // Implement user auth logic
    // // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    // const password = req.headers.password;


    // User.findOne({
    //     username : username,
    //     password : password
    // }).then(function(value){
    //     if(value){
    //         next();
    //     }
    //     else{
    //         res.status(403).json({
    //             msg: "User doesnt exist"
    //         })
    //     }
    // })

    const token = req.headers.authorization;
    // Bearer asssa => ["Bearer",asssa ]

    const words = token.split(" ");
    const jwtToken = words[1];

    const decodedValue = jwt.verify(jwtToken,JWT_SECRET);

    if(decodedValue.username){
        req.username = decodedValue.username;
        next();
    }
    else{
        res.status(403).json({
            "message":"You are not authenticated"
        })
    }
}

module.exports = userMiddleware;