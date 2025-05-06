const { User } = require( "../db")
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");

const SUPER_SECRET_KEY = "I_AM_BATMAN";


async function userMiddleware( req , res , next){
    
    // const authToken = req.headers.Authorization; ❌
    const authToken = req.headers.authorization; // ✅
    // VVVIMP - req.headers should always be in Lower case , here i use Authorization that is incorrect

    if(!authToken){
        return res.status(401).json({
            msg:"Auth token is not sent"
        })
    }

    const decodeAuth =  jwt.verify(authToken , SUPER_SECRET_KEY );
    console.log(decodeAuth);
    
    const username = decodeAuth.username;
    
    const user = await User.findOne(
        {
            username : username
            //Only allow the users to access courses that are Published
        }
    )
    
    if(user){

            req.user = user;
            next();     
    }else{
       res.status(403).json({
        msg:"User does not Exist !!"
       })
    }
}

function generateToken(user){
    return jwt.sign({
            username : user.username ,
            password : user.password
        } , 
            SUPER_SECRET_KEY , 
            {expiresIn : '120s'})//you can pass '1h'/ '15m'
}

module.exports ={ userMiddleware , generateToken }