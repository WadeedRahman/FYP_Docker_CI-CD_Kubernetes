
import { Link } from 'react-router-dom'
import "./Home.css"
import {RiSearchLine} from "react-icons/ri";
import {RiShoppingCartFill} from "react-icons/ri";

const Newbar = () => {
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
             
            <div className="searchbox">
                <input type="search" name="search" id=" " placeholder="Search For Producs"/>
                <div className="searchicon"><RiSearchLine/></div>
            </div>
                <div className="icons">

               <Link className="carticon" to="/Image"><RiShoppingCartFill/> <span className="count">0</span>
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
                    <Link to="">HELLO USER</Link>
                     </li>
                    <li>
                        <Link to="/Home">LOGOUT</Link>
                    </li>
                    </ul>
                </div>
                </div>
                
        </nav>
    </header>
    </>
  )
}

export default Newbar;


