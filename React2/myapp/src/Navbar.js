
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import { RiSearchLine, RiShoppingCartFill, RiMenuLine, RiCloseLine } from "react-icons/ri";


const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = sessionStorage.getItem('session_token');
    const user_name = sessionStorage.getItem('username');

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchTerm('');
    };

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header>
                <nav>
                    <div className="cont">
                        <a href=" " className="logo">
                            <h1>
                                <img src="os2.png" alt="go" className="go" />
                                <span> M</span>EDI
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
                            <button type="submit" className="searchicon"><RiSearchLine /></button>
                        </form>

                        <div className="icons">
                            <Link className="carticon" to="/"><RiShoppingCartFill /></Link>
                            <div className="nav-toggle" onClick={toggleMenu}>
                                {isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className={`bn-cont ${isMenuOpen ? 'active' : ''}`}>
                        <ul className={`navlist ${isMenuOpen ? 'active' : ''}`}>
                            <li><Link to="/Home">HOME</Link></li>
                            <li><Link to="/Chatbot">AI CHATBOT</Link></li>
                            <li><Link to="/About">ABOUT US</Link></li>
                            <li><Link to="/Contact">CONTACT US</Link></li>
                        </ul>
                        <div className="ls-cont">
                            <ul className={`ls ${isMenuOpen ? 'active' : ''}`}>
                                {isLoggedIn ? (
                                    <>
                                        <li>Hi {user_name}</li>
                                        <li><Link to="/login">Logout</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/Login">LOGIN</Link></li>
                                        <li><Link to="/Signup">SIGNUP</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
           
        </>
    );
};

export default Navbar;



