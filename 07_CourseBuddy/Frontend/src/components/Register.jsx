import { Link , useNavigate } from 'react-router-dom';
import {useState } from 'react';

//axios
import axios from 'axios'

export default function Register(){
    const [ username , setUsername] = useState("");  
    const [ password , setPassword ] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:3000/user/" , {
                username ,
                password
            });

            if(res.data.msg === "User created Successfully!"){
                localStorage.setItem("isAuthenticated" , "true");
                localStorage.setItem("username" , username);
                navigate("/home")
            }
            else{
                alert(res.data.msg);
            }
        }catch(error){
            console.error("Error registering user : ", error );
            alert("Something Went Wrong!");
        }
    };

    return (
        <div>
            <h1 style={{paddingBottom:"5cm"}}>Registration Page</h1>

            <form onSubmit={handleSubmit}>
            <div style={{ position:"relative" , top :"-140px"}}>
                <label >Username </label> <input type="text"  value={username} onChange={(e)=>{
                    setUsername(e.target.value);
                }}/>
            </div>
            <div style={{ position:"relative" , top :"-120px"}}>
                <label>Password </label> <input type="text" value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
            </div>
            <div style={{ position:"relative" , top :"-100px", padding:"20px"}}>
            <button type="submit" >Register</button>
            </div>
            </form>


            <div style={{ position:"relative" , top :"-80px"}}>
                Already user? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}