import React from 'react';
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Aichatbot from './Aichatbot';
import Login from './logintest';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Description from "./Description";
import Recommendation from "./Recommendation";
import Whole from './Whole';
import Checkout from './components/Checkout';
import Newlogin from './Newlogin';
import UserCartComponent from './components/UserCartComponent';

import Logout from './Logout';
function App() {
  return (
    <>
    < BrowserRouter>
    
    <Routes>
     
   <Route path="/*"  element={<Home/>}></Route>
    <Route path="/About"  element={<About/>}/>
    <Route path="/Contact"  element={<Contact/>}/>
    <Route path="/Ai chatbot"  element={<Aichatbot/>}/>
    <Route path="/Login"  element={<Login/>}/>
    <Route path="/Signup"  element={<Signup/>}/>
    <Route path="/Whole"  element={<Whole/>}/>
      <Route path="/Description" element={<Description/>}/>
      <Route path="/Recommendation" element={<Recommendation/>}/>
      <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
      <Route path="/Newlogin" element={<Newlogin/>}/>
      <Route path="/Logout" element={<Logout/>}/>
     
      <Route path="/Checkout" element={<Checkout />} />
    </Routes>
    </BrowserRouter>
     
     
    </>
  );
}
export default App;
