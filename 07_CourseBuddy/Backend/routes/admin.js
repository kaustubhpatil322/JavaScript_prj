const express = require("express")
const adminMiddleware = require("../middlewares/admin.js")
const { Admin } = require("../db")//this is assumed as /db/index.js
const { Course } = require("../db")
const router = express.Router()

router.use(express.json())

router.post("/signup" , async (req ,res)=>{
    //Here it 
     const username = req.body.username
     const password = req.body.password
    
    const response = await Admin.findOne(
        {
            username,
            password
        }
    )
    if(response){
        res.json({
            msg:"Admin already exists"
        })
        next()
    }
    else{
        Admin.create({
            username,
            password
        })
        res.json({
            msg:"User created Successfully!!"
        })
    }
})

router.post("/courses" , adminMiddleware , async (req , res)=>{
    const  title  = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink
    const published  = req.body.published
    const response = await Course.findOne(
        {
        title,
        description,
        price,
        imageLink,
        published
        }
    )
    if(!response){
        Course.create({
            title,
            description,
            price,
            imageLink,
            published
        })
        res.json({
            msg:"Course created Successfully"
        })
    }
    else{
        res.status(409).json({ // error 409  if Data already existed
            msg:"Course already exists"
        })
    }
})

router.get("/" ,adminMiddleware , async (req , res) =>{
    const response = await Admin.find()
    if(response){
        res.json(response);
    }else{
        res.status(404).json({
            msg:"Admin DB is Empty"
        })
    }
})

router.get("/ids/:id" ,adminMiddleware , async (req , res )=>{
    //allow admins to receive specific course details by id
    const _id = req.params.id
    try{
        const response = await Admin.findOne(
            {
              _id 
            }
          ) 
          if(response){
              res.json(response)
          }else{
              res.status(404).json({
                  msg:"Admin not Found"
              })
          }
    }
    catch(error){
        res.status(500).json({
            msg:"SOMething  went Wrong"
        })
    }
})

router.get("/courses" ,adminMiddleware , async (req , res)=>{
    //Get all the courses Present in the database
    const response =await Course.find()
    if(response){
        res.json({
            courses : response
        })
    }else{
        response.status(404).json({
            msg:"Database is Empty"
        })
    }
})

module.exports = router