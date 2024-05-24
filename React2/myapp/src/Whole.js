/*import React, { useState, useEffect } from 'react';
import './Whole.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Whole() {
  const [courses, setCourses] = useState([
  ]);
  const [cartCourses, setCartCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []); // Fetch products when the component mounts

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost/Medifast/products.php');
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
    const alreadyCourses = cartCourses.find(item => item.product.id === course.id);
    if (alreadyCourses) {
      const latestCartUpdate = cartCourses.map(item =>
        item.product.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartCourses(latestCartUpdate);
    } else {
      setCartCourses([...cartCourses, { product: course, quantity: 1 }]);
    }
  };

  const deleteCourseFromCartFunction = (course) => {
    const updatedCart = cartCourses.filter(item => item.product.id !== course.id);
    setCartCourses(updatedCart);
  };

  const totalAmountCalculationFunction = () => {
    return cartCourses.reduce((total, item) => 
      total + item.product.price * item.quantity, 0);
  };

  const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value);
  };

  const filterCourseFunction = courses.filter(course =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  return (
    <div className="App">
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

       <Routes>
     <Route to="/SearchComponent" element={<SearchComponent
        searchCourse={searchCourse}
        courseSearchUserFunction={courseSearchUserFunction}
      />}></Route> 
      
     
      <Route path='/UserCartComponent' element={ <UserCartComponent
          cartCourses={cartCourses}
          deleteCourseFromCartFunction={deleteCourseFromCartFunction}
          totalAmountCalculationFunction={totalAmountCalculationFunction}
          setCartCourses={setCartCourses}
          />}>
          </Route>
  +    </Routes>
    
    </div>
  );
}

export default Whole;
       */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowCourseComponent from './components/ShowCourseComponent';
import SearchComponent from './components/SearchComponent';
import UserCartComponent from './components/UserCartComponent';

function App() {
  const [courses, setCourses] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost/Medifast/products.php');
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
    const alreadyCourses = cartCourses.find(item => item.product.id === course.id);
    if (alreadyCourses) {
      const latestCartUpdate = cartCourses.map(item =>
        item.product.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartCourses(latestCartUpdate);
    } else {
      setCartCourses([...cartCourses, { product: course, quantity: 1 }]);
    }
  };

  const deleteCourseFromCartFunction = (course) => {
    const updatedCart = cartCourses.filter(item => item.product.id !== course.id);
    setCartCourses(updatedCart);
  };

  const totalAmountCalculationFunction = () => {
    return cartCourses.reduce((total, item) =>
      total + item.product.price * item.quantity, 0);
  };

  const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value);
  };

  const filterCourseFunction = courses.filter(course =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <SearchComponent
                searchCourse={searchCourse}
                courseSearchUserFunction={courseSearchUserFunction}
              />
              <main className="App-main">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <ShowCourseComponent
                    courses={filterCourseFunction}
                    addCourseToCartFunction={addCourseToCartFunction}
                  />
                )}
              </main>
            </>
          } />
          <Route path="user-cart" element={
            <UserCartComponent
              cartCourses={cartCourses}
              deleteCourseFromCartFunction={deleteCourseFromCartFunction}
              totalAmountCalculationFunction={totalAmountCalculationFunction}
              setCartCourses={setCartCourses}
            />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
