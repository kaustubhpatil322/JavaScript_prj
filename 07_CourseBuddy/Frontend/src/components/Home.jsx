import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Home(){
        const [username , setUsername] = useState(0);

        const navigate = useNavigate();

        useEffect(  ()=>{
            const isAuthenticated = localStorage.getItem("isAuthenticated");

            if( isAuthenticated !== "true" ){
                navigate('/')
            }else{
                  setUsername(localStorage.getItem("username"));
            }
        } , [navigate]);
        
        const findNewCourseHandler = ()=>{
            navigate("/findNewCourse")
        }

        const yourCoursesHandler = ()=>{
            navigate("/yourCourses");
        }

        return (
            <div>
            
                <h2>Welcome, {username}</h2>
                <div style={{
                    background :"rgb(242, 143, 208)",
                    position : 'relative',
                    top : '-320px',
                    padding : '30px 420px'

                }}>
                        <button style={{
                            marginRight:'30px'
                        }}
                        onClick = {findNewCourseHandler}
                        >Find new Courses</button>
                        <button onClick={yourCoursesHandler}>Your Courses</button>
                </div>
            </div>
        )

        
}