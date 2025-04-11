const { User } =require( "../db")

async function userMiddleware( req , res , next){
    const username = req.headers.username
    const password = req.headers.password

    const response = await User.findOne(
        {
            username : username,
            password : password,
             //Only allow the users to access courses that are Published
        }
    )
    
    if(response){
        next()
    }else{
       res.status(403).json({
        msg:"User does not Exist !!"
       })
    }
}

module.exports = userMiddleware