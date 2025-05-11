import styles from "./component.module.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


import axios from 'axios';


 export default function Login(){
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{

            const res = await axios.post("http://localhost:3000/user/login" ,{

                username  : username , 
                password : password

            })

            if(res.data.msg === "Login Successfull"){
                
                localStorage.setItem("authToken" , res.data.token);
                
                localStorage.setItem("isAuthenticated" , true);
                navigate("/home");
            }
            else(
                alert(res.data.msg)
            )

        }
        catch(error){
                console.error("Error : " + error)
                alert("Something went wrong");
        }
    }
    return (
        <div className={styles.container}>
                <form onSubmit={handleSubmit}>

                    <h1 className={styles.cont_h1} >Login Page</h1>

                    <div >

                        <input type="text"
                         value={username}
                         onChange = { (e) =>{ setUsername(e.target.value)} }  
                         placeholder ="Enter username" 
                         style={{padding:"16px 50px"}}/>

                    </div><br />

                    <div>

                        <input type="text" 
                               placeholder = "Enter password" 
                               value = { password }
                               onChange = { (e) => { setPassword(e.target.value)} }
                               style={{padding:"16px 50px"}}/>
                    </div>
                    <button type="submit">Login</button>

                </form>
        </div>
    )
}