const mongoose = require("mongoose")
const { Schema } = mongoose

mongoose.connect("mongodb+srv://ksp29mar04:qwert123@temp-cluster.sfed0ez.mongodb.net/CourseBuddy")

const adminSchema = new Schema({
    username :String,
    password :String
})

const userSchema = new Schema({
    username : String,
    password : String,
    purchasedCourses :[{
        type: mongoose.Schema.Types.ObjectId,//Here i forgot to gave [] brackets because of which the this component acted as json onject instead of making into array.VVIMP
        ref : 'Course_Records'
    }]
})

const courseSchema = new Schema({
    title: String,
    description:String,
    price : Number,
    imageLink : String,
    published : Boolean
})

const Admin = mongoose.model('Admin_Records' , adminSchema)
const User = mongoose.model('User_Records' , userSchema)
const Course = mongoose.model('Course_Records' , courseSchema)

module.exports = {
    
    Admin,
    User,
    Course

}



