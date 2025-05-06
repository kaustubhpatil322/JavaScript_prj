import axios from 'axios';
import { useState , useEffect , useRef } from 'react';


export default function FindNewCourse(){
    const [ courses , setCourses] = useState([]);
    const [ purchased , setPurchased] = useState({});//this implies purchased is an Object where the courseName is key and its value in true/false

    const buttonRefs = useRef([]);
    // const username = localStorage.getItem("username");
    // const password = localStorage.getItem("password");

    useEffect( ()=>{
        const fetchCourses = async()=>{
            try{
                    const response = await axios.get("http://localhost:3000/admin/courses",{
                        headers : {
                            username : "krishna",
                            password : "naik123"
                        }
                     });
                     if(response && response.data){
                        setCourses(response.data.courses);
                     }
   
            }catch(error){
                console.error("Error : " + error);
                alert("Something Went Wrong!");
            }
        
        }

        fetchCourses();
    } , [])
    
    console.log(courses);

    function CourseList({courses}){
        
        const buyCourseHandler = (courseName)=>{
              if(purchased[courseName]){ // Once Course bought , don't let it run throught the function all over again 
                return ;
              }
              try{
                const fetchCourse = async (courseName )=>{
            
              
                    const response = await axios.put(`http://localhost:3000/user/courses/ids/${courseName}` ,{},
                    {
                      headers:{
                          Authorization : localStorage.getItem("authToken")
                      }
                    }
                  );
                  
                  console.log(response);
                  if(response && response.data){
                    if(response.data.msg === "Course added to your List"){

                      alert("Course added to your list");



                      //}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
                      setPurchased( (prev) => {
                        const updated = { ...prev};//this puts all the items present in prev into 'updated' 
                        updated[courseName] = true;
                        return updated;
                      })
                    }
                    else{
                      alert(response.data.msg);
                    }
                  }

                }

                //Finction Call:-
                fetchCourse(courseName);
              }catch(error){
                console.error(" Error : " + error);
                alert("Something Went Wrong");
              }
  
        }
        
        return (
            <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                {courses.map((course) => (
                    <div key={course._id} style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "16px",
                      boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
                    }}>
                      <img src={course.imageLink} alt={course.title} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <strong>₹{course.price}</strong>
                      <div>
          
                    <button 

                    //ref = {(el) => { buttonRefs.current[index] = el}}
                    //this above is the way to apply ref to more than one item having same attributes like button in this one, so that we can make the changes on specific item (by passing index in .map argument)

                    disabled = {purchased[course.title]}//initially it sets to false using this property
                    onClick ={
                      ()=>{
                      buyCourseHandler(course.title)
                    }}>
                      { purchased[course.title] ? 'Course added' : 'Buy course' }
                    </button>
                  </div>
                    </div>
                ))}
          </div>
         
            </div>
        );
    };


    return (
       <div>
            <div style ={{
                background :"rgb(131, 185, 133)",
                paddingLeft : "260px",
                paddingRight : "260px",
                borderRadius : "12px",
                position : "relative",
                top : "-270px"
            }}>
                <p style={{
                    fontSize : "280%",
                    color :"rgb(12, 34, 71)",
                    fontWeight: "bold"
                }}>Course List</p>
            </div>
            <br />
           <div>
               <CourseList courses = {courses}/>   
            </div>
            
        
       </div>
    )

}