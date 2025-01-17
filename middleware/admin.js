const { Admin } = require("../db/index")
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
// Middleware for handling auth
// function adminMiddleware(req, res, next) {
//     // Implement admin auth logic
//     // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

//     const username = req.headers.username;
//     const password = req.headers.password;


//     Admin.findOne({
//         username : username,
//         password : password
//     })
//     .then(function(value){
//         if(value){
//             next();
//         }
//         else{
//             res.status(403).json({
//                 msg: "Admin doesnt exist"
//             })
//         }
//     })
// }

// wth JWT
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
    // Bearer asssa => ["Bearer",asssa ]

    const words = token.split(" ");
    const jwtToken = words[1];
    try {
        const decodedValue = jwt.verify(jwtToken,JWT_SECRET);

        if(decodedValue.username){
            next();
        }
        else{
            res.status(403).json({
                "message":"You are not authenticated"
            })
        }
    } catch (error) {
        res.json({
            msg:"Incorrect Input"
        })
    }
 
}
module.exports = adminMiddleware;