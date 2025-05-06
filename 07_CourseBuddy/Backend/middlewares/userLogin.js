const jwt = require("jsonwebtoken");
const { User } = require("../db/index");
const SUPER_SECRET_KEY = "I_AM_BATMAN" ;

function userLoginMiddleware(req , res , next){
    const {username , password} = req.body;

    const user = User.findOne({
        username
    })
    
    if(!user) res.status(404).json({
        msg: "User doesn't exist"
    });

    const isPasswordCorrect = bcrypt.compareSync(password , user.password);
    if(!isCorrrect) return res.status({
        msg:"Invalid Credentials"
    })
   
}

module.exports = userLoginMiddleware