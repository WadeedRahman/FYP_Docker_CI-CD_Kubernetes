import React, { useState, useEffect } from 'react';
import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Chatbot from './Chatbot';
import Login from './logintest';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Description from "./Description";
import Recommendation from "./Recommendation";
import History from './History';
import Newlogin from './Newlogin';
import ShowCourseComponent from './components/ShowCourseComponent';
import SearchComponent from './components/SearchComponent';
import UserCartComponent from './components/UserCartComponent';
import Checkout from './components/Checkout';
import './Whole.css';
import Logout from './Logout';

function App() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const sessionToken = localStorage.getItem('session_token');
    const username = localStorage.getItem('username');
    if (sessionToken && username) {
      verifySessionToken(sessionToken, username);
    } else {
      navigate('/login');
    }
  }, []);

  const verifySessionToken = async (token, username) => {
    try {
      const response = await fetch('http://localhost:8080/verify_session.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_token: token })
      });

      if (!response.ok) {
        throw new Error('Failed to verify session');
      }

      const data = await response.json();
      if (data.valid) {
        fetchProducts();
        navigate('/home');
      } else {
        localStorage.removeItem('session_token');
        localStorage.removeItem('username');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error verifying session:', error);
      localStorage.removeItem('session_token');
      localStorage.removeItem('username');
      navigate('/login');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products.php');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const addCourseToCartFunction = (course) => {
    const alreadyInCart = cartCourses.find(item => item.product.product_id === course.product_id);
    if (alreadyInCart) {
      const updatedCart = cartCourses.map(item =>
        item.product.product_id === course.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartCourses(updatedCart);
    } else {
      setCartCourses([...cartCourses, { product: course, quantity: 1 }]);
      setCartItemCount(prevCount => prevCount + 1);
    }
   
  };

  const deleteCourseFromCartFunction = (course) => {
    const updatedCart = cartCourses.filter(item => item.product.product_id !== course.product_id);
    const deletedCourse = cartCourses.find(item => item.product.product_id === course.product_id);
    setCartCourses(updatedCart);
    if (deletedCourse) {
      setCartItemCount(prevCount => prevCount - 1);
    }
  };
  const updateCartItemCount = (newCount) => {
    setCartItemCount(newCount);
  };
  const totalAmountCalculationFunction = () => {
    return cartCourses.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value);
  };

  const filterCourseFunction = courses.filter(course =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  return (
    <>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chatbot" element={<Chatbot />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Description" element={<Description />} />
        <Route path="/Recommendation" element={<Recommendation />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Newlogin" element={<Newlogin />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/" element={
          <>
            <SearchComponent
              searchCourse={searchCourse}
              courseSearchUserFunction={courseSearchUserFunction}
              cartItemCount={cartItemCount}
            />
            <main className="App-main">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <ShowCourseComponent
                  courses={courses}
                  filterCourseFunction={filterCourseFunction}
                  addCourseToCartFunction={addCourseToCartFunction}
                />
              )}
            </main>
          </>
        } />
        <Route path="UserCartComponent" element={
          <UserCartComponent
            cartCourses={cartCourses}
            deleteCourseFromCartFunction={deleteCourseFromCartFunction}
            totalAmountCalculationFunction={totalAmountCalculationFunction}
            setCartCourses={setCartCourses}
            updateCartItemCount={updateCartItemCount}
            cartItemCount={cartItemCount}
          />
        } />
        <Route path="Checkout" element={<Checkout />} />
        <Route path="History" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
