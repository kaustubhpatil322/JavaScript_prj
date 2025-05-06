const express = require("express")
const { User } = require("../db")
const { Course } = require("../db")
const {userMiddleware , generateToken} = require("../middlewares/user")//ite is assumed as-  /user.js
const bcrypt = require("bcryptjs");



const router = express.Router()
router.use(express.json())


router.post("/" , async (req , res)=>{
    const username = req.body.username
    const password = req.body.password
    const passwordHash = bcrypt.hashSync(password  , 10);
    const user = await User.findOne({
        username
    })
    if(user){
        res.json({msg:"User already Exists"})
    }
    else{
        User.create({
            username , 
            password : passwordHash 
        })

        

        res.json({
            msg:"User created Successfully!"          
        })
    }
})

router.post("/login"   ,  async(req , res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ // Assuming every username is unique
        username
    })
    if(user){
        if(bcrypt.compareSync(password ,  user.password )){// the arguments in compareSync must be passed in this specific sequence !!!!!..
            const token = generateToken(user)
             res.json({
                 msg:"Login Successfull", 
                 token : token
             })
         }
         else{
             res.json({
                 msg: "Incorrect Password"
             })
         } 
    }
    else{
        res.json({
            msg: "Username is not valid"
        })
    }
})

router.get("/courses" ,userMiddleware , async (req ,res)=>{
    //Get all the course that are purchased by the user
    // const username  = req.headers.username
    // const password = req.headers.password

    // const user = await User.findOne({
    //     username:  req.user.username
    // })
    const user = req.user;
    
    
    if(user){
        const course = await Course.find({
            _id : {$in : user.purchasedCourses}
        })

        if(course.length == 0)  res.json({
            msg:"No Course Added Yet!"

        });

        res.json({
            courses : course
        });
    }
})

router.put("/courses/ids/:courseName" , userMiddleware, async (req, res)=>{
    //Allow users to choose course from the given options
    // const username = req.headers.username
    // const password = req.headers.password

    const user = req.user;
    const username = user.username;
    const courseName = req.params.courseName
    const course= await Course.findOne(
        {
            title : courseName,
            published : true
        }
    )
    if(!course){
        res.json({
            msg:"Course is not yet  published"
        })
    }
    else{
        const response = await User.updateOne({
            username
        } ,
        {
           $push: {
                purchasedCourses : course._id
           }
        })
        if(response){
            res.json({
                msg:"Course added to your List"
            })
        }
    }
    // const course = Course.findOne({
    //     title
    // })
    
})

module.exports = router