const express = require("express")
const { User } = require("../db")
const { Course } = require("../db")
const userMiddleware = require("../middlewares/user")//ite is assumed as-  /user.js

const router = express.Router()
router.use(express.json())


router.post("/" , async (req , res)=>{
    const username = req.body.username
    const password = req.body.password
    const response = await User.findOne({
        username,password
    })
    if(response){
        res.json({msg:"User already Exists"})
    }
    else{
        User.create({
            username , 
            password 
        })
        res.json({
            msg:"User created Successfully!"
        })
    }
})

router.get("/courses" ,userMiddleware , async (req ,res)=>{
    //Get all the course that are purchased by the user
    const username  = req.headers.username
    const password = req.headers.password
    const response = User.findOne({
        username, password
    })
    if(response){
        res.json({
            courses : response.purchasedCourse
        })
    }
})


router.post("/courses/ids/:courseName" , userMiddleware, async (req, res)=>{
    //Allow users to choose course from the given options
    const username = req.headers.username
    const password = req.headers.password
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
            username,password
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