//Middlewares for Handling authorization
const { Admin } = require("../db") // it is assumed as-   ../db/index.js   

async function adminMiddleware(req ,res , next){
    const username = req.headers.username
    const password = req.headers.password
    
    const response = await Admin.findOne(
        {
            username:username,
            password:password
        }
    )
        if(response){
            next()
        }
        else{
            res.status(403).json({
                msg:"Invalid Admin"
            })
        }
}

module.exports = adminMiddleware