import React from 'react';

function ShowCourseComponent({ courses, filterCourseFunction, addCourseToCartFunction }) {
  return (
    <div className="product-list">
      {filterCourseFunction.length === 0 ? (
        <p className="no-results">Sorry , No matching Product found.</p>
      ) : (
        filterCourseFunction.map(course => (
          <div key={course.product_id} className="product">
            <img src={`${course.image_path}`} alt={course.name} />
            <h3>{course.name}</h3>
            <p>Rs {course.price}</p>
            <button className="add-to-cart-button" onClick={() => addCourseToCartFunction(course)}>
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ShowCourseComponent;
