import {Button, Form} from 'react-bootstrap';
import { useRef , useEffect , useState } from "react";
import axios from 'axios';
 
const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

function App() {
  const [ images , setImages] = useState("");
  const [imageArray , setImageArray] = useState([]);
  const [totalPages  , setTotalPages ] = useState(0);
  const [page , setPage ] = useState(1);
  console.log(import.meta.env.VITE_API_KEY)
  const searchInput = useRef(null);
  useEffect( ()=>{
    const getImages = async ()=>{
        
        if(images !== ""){
              try{
                  var {data} = await axios.get(`${API_URL}?query=${images}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`)
                 
                }catch(error){
                    console.log(error);
                }
        }
        setImageArray(data.results);
        setTotalPages(data.total_pages);
    }
    getImages();
  },[images , page]);

  const handleSubmit = (event)=>{
    event.preventDefault();
    setImages(searchInput.current.value);
    setPage(1);
    console.log(searchInput.current.value);
  }

  const handleSelection = (selection)=>{
    searchInput.current.value = selection;
  }

  //Images DIV
  const imageDiv= imageArray.map( image => {
    return (
      <img key ={image.id}
           src={image.urls.small} 
           alt ={image.alt_description} 
           className="image" />
    )
  })

  //Page Buttons
  const prevButton = page>1 && 
                    <Button onClick={()=> setPage(page-1)}>Previous</Button>
  const nextButton = page<totalPages &&
                    <Button onClick = {()=> setPage(page+1)}>Next</Button>                 
                
  return (
    
     <div className="main-container">
        <h1 className='title'>Image Search</h1>
        <div className='search-section'>
          <Form onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Type Image Name"
            className="search-input"
            ref={searchInput}
          />
          </Form>
        </div>
      
        <div className="filters">
          <div onClick={()=> handleSelection('Nature')}>Nature</div>
          <div onClick={()=> handleSelection('Birds') }>Birds</div>
          <div onClick={()=> handleSelection('Cats')}>Cats</div>
          <div onClick={()=> handleSelection('Shoes')}>Shoes</div>
        </div>
        <div className="images-wrapper">
            {imageDiv}
        </div>
        <div className="nav-btn">
            {prevButton} 
            {nextButton}
        </div>
    </div> 
 
  )
}

export default App
