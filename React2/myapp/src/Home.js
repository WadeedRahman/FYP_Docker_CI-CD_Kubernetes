import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import "./Home.css"
import {RiSearchLine} from "react-icons/ri";
import {RiShoppingCartFill} from "react-icons/ri";
import Hero from './Hero/Hero';
import Footer from './Footer';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchSubmit = (event) => {
        event.preventDefault(); 
        setSearchTerm('');
      };

    const handleChange = event => {
        setSearchTerm(event.target.value);
       
      };
     
  return (
    <>
   
    <header>
        <nav>
         
            <div className="cont">
            
            <a href=" "  className="logo"> 
            <h1>
             <img src="os2.png" alt="go" className="go"  />
                <span > M</span>EDI
                </h1>
                <div className="logo2">
                    <h1>
                        <span>F</span>AST
                    </h1>
                </div>
                </a>
             
                <form className="searchbox" onSubmit={handleSearchSubmit}>
  <input
    type="search"
    name="search"
    placeholder="Search For Products"
    value={searchTerm}
    onChange={handleChange}
  />
  <button type="submit" className="searchicon"><RiSearchLine/></button>
</form>

                <div className="icons">

               <Link className="carticon" to="/Whole"><RiShoppingCartFill/> 
                   </Link>

                </div>
                
            </div>
            
            <hr />

            <div className="bn-cont">  
                <ul className="navlist">
        
                    <li >
                    <Link to="/Home">HOME</Link>
                     </li>
                    <li>
                        <Link to="/Ai chatbot">AI CHATBOT</Link>
                    </li>
                    <li>
                        <Link to="/About">ABOUT US</Link>
                    </li>
                    <li>
                        <Link to="/Contact">CONTACT US</Link>
                    </li>
                </ul>
                <div className="ls-cont">
                <ul className="ls">
                    <li >
                    <Link to="/Login">LOGIN</Link>
                     </li>
                    <li>
                        <Link to="/Signup">SIGNUP</Link>
                    </li>
                    </ul>
                </div>
                </div>
                
        </nav>
        
    </header>
    <Hero/>
    <Footer/>
    </>
  )
}

export default Home;


