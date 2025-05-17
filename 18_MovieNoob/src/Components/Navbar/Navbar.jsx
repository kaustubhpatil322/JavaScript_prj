import './Navbar.css';
import { useState } from 'react';
import search from './../../assets/search.png';

function Navbar({setMovieName , setPlayStatus , setShowMain}){
      const [isOpen, setIsOpen] = useState(false);
      const [text , setText] = useState("");
      const movieSearchHandler = ()=>{
          setPlayStatus(false); // To be tested
          setMovieName(text);
          setShowMain(true);
      }

    return (
        <nav className="navbar">
      <div className="navbar-logo">MovieNoob</div>

        <span>
          <input 
            type="text" 
            placeholder="Enter Movie Name" 
            className="navbar-search"
            onChange = {(e)=> setText(e.target.value) }
          />
          <img  src={search} alt="" onClick={movieSearchHandler} />
        </span>
          
      
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}> 
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>
      
      <div 
        className="navbar-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
    )
}

export default Navbar;