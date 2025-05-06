import {useState , useEffect } from 'react';
import axios from 'axios';

export default function YourCourses(){
    const [courses , setCourses] = useState([]);


    useEffect(()=>{
        const fetchPurchasedCourses  = async ()=>
            {
                const response = await axios.get("http://localhost:3000/user/courses" ,
                    {
                        headers : {
                            Authorization : localStorage.getItem("authToken")
                        }                    
                    }
                );

                if(response && response.data){
                    
                    setCourses(response.data.courses)
                }

            } 
            fetchPurchasedCourses();
    } , [])


function CourseCardComponent(){

        return (
            <div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",justifyItems : "center" , gap: "1rem" }}>
                {
                    courses.map(course => (
                        <div key={course._id} style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "16px",
                        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
                        }}>
                        <img src={course.imageLink} alt={course.title} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        
                        </div>
                ))}
            </div>
          </div>
        )
    }
    return (
        
            <div>
            <div style={{background:"rgb(86, 205, 138)" , 
                    padding:"10px 20px" , 
                    borderRadius : "25px" ,
                    marginTop : '2px',
                    textAlign : 'center'
                
                    }}>
                <h2 style = {{
                    fontSize : "2rem",
                    margin : '0'
                }}>Your Courses</h2>
            </div>
            <br />
                <CourseCardComponent/>
            </div>    
    )
}