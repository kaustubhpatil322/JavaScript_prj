import {useState , useEffect} from 'react';
import Navbar from './Components/Navbar/Navbar';
import Background from './Components/Background/Background';
import Main from './Components/Main/Main';
function App() {


  const [ movieName , setMovieName ] = useState("");
  const [playStatus , setPlayStatus] = useState(true);
  const [ data , setData ] = useState({});
  const[bgCount , setBgCount] = useState(1);
  const [showMain , setShowMain] = useState(false);

  useEffect(()=>{
    setInterval(()=>{
      setBgCount((count)=>{ return count===5?1:count+1});
    } ,3000);
    if(movieName != ""){
        try{
          fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${import.meta.env.VITE_API_KEY}`)
            .then((response) => response.json())
              .then((json) => setData(json));
        }catch(error){
          console.log("Error :" , error);
        }
    }
  },[movieName]);

  return (
    <div>
      <Navbar setMovieName={setMovieName} setPlayStatus={setPlayStatus} setShowMain={setShowMain} />
      <Background bgCount = {bgCount} playStatus={playStatus}/>
      {showMain && <Main key={data.imdbID} data={data} movieName={movieName}/>}
    </div>
  )
}

export default App


