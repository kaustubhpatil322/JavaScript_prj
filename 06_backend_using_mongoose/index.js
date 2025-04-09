
// const mongoose = require('mongoose')

// const {Schema} = mongoose // similar to writing- mongoose.Schema which is a property in mongoose



// mongoose.connect("mongodb+srv://ksp29mar04:qwert123@temp-cluster.sfed0ez.mongodb.net/BookStore")


// const bookSchema =new  Schema({
//     title : String,
//     author : String,
//     year : Number,
//     price:Number,
//     feedback:{
//         likes:Number,
//         comments:String
//     }
// })


// const book_info = mongoose.model('Book_Info', bookSchema);// this will create an collection called Book_Info in the mongoDB;

// const new_book = new book_info(
//     {
//         title:"Mein Keimph",
//         author:"Adolph Hitler",
//         year:1939,
//         price:69,
//         feedback:{
//             likes:1,
//             comments:"Very Racist!!"
//         }
//     }
// )

// new_book.save()
// .then(console.log("Book Added Sucessfully"))

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {Schema} = mongoose

app.use(express.json())

mongoose.connect("mongodb+srv://ksp29mar04:qwert123@temp-cluster.sfed0ez.mongodb.net/City_Details")
const city_schema = new Schema({
    name:String,
    state:String,
    population:Number,
    stapleFood:String,
    country:String  
})

const cities =  mongoose.model('cities' , city_schema)

app.post("/cityDetails" , (req,res)=>
    {
        const name =req.body.name
        const state =req.body.state
        const population=  req.body.population
        const stapleFood = req.body.stapleFood
        const country = req.body.country

        const newCity = new cities({
            name,state,population,stapleFood,country
        })

        newCity.save()
        .then(res.json({
            msg:"City added in database!",
            id:newCity._id
        }))
       
    })

app.get("/cityDetails" , (req,res)=>{
    cities.find()
    .then((response)=>{
        res.send(response)
    })
})

app.listen(3000,()=>{console.log("App listening on PORT =>3000")})


