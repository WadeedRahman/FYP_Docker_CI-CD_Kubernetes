//components/ShowCourseComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
function ShowCourseComponent({ courses, 
	filterCourseFunction, 
	addCourseToCartFunction }) {
	return (
		<div className="product-list">
			{filterCourseFunction.length === 0 ? (
				<p className="no-results">
					Sorry Janu, No matching Product found.
				</p>
			) : (
				filterCourseFunction.map((product) => (
					<div className="product" key={product.id}>
						<img src={product.image} alt={product.name} />
						<h2>{product.name}</h2>
						<p>Price: Rs {product.price}</p>
						<button
							className="add-to-cart-button"
							onClick={() => addCourseToCartFunction(product)}
						>
						<Link to="/UserCartComponent">Add to Shopping Cart </Link>
						</button>
					</div>
				))
			)}
		</div>
	);
}

export default ShowCourseComponent;
