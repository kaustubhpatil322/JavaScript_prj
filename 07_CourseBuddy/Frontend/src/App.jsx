import { useState , useEffect } from 'react'
import { Routes , Route } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Login  from './components/Login'
import  Register  from './components/Register'
import Home from './components/Home'
import FindNewCourse from './components/FindNewCourse'
import YourCourses from './components/YourCourses'


function App() {
  const [count, setCount] = useState(0)

  return (

    <div>
       <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home"  element={<Home/>}/>
        <Route path="/findNewCourse" element = {<FindNewCourse/>}/>
        <Route path="/yourCourses" element = {<YourCourses/>}/>
        
        </Routes>
    </div>

  )
}

export default App
