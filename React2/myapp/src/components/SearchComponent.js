//components/SearchComponent.js
import React  from 'react';
import { RiShoppingCart2Fill } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import { useState } from 'react';

function SearchComponent({ searchCourse,setSearchCourse }) {
	const [courses, setCourses] = useState([
	]);
	const [cartCourses, setCartCourses] = useState([]);

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
	
	return (
		<header className="App-header">
			<h1>Shopping Cart</h1>
			<div className="search-bar">
				<input
					type="text"
					placeholder="Search for Products..."
					value={searchCourse}
					onChange={courseSearchUserFunction}
				/>
				
			</div>
			<div className='search_cart'><Link to="/UserCartComponent"><RiShoppingCart2Fill/></Link>
		
			
			
			
			
			</div>
		</header>
	);
}

export default SearchComponent;
