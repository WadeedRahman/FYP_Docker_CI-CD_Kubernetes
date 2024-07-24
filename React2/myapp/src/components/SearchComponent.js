import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./SearchComponent.css";
import { RiShoppingBag3Fill, RiCornerUpLeftDoubleLine } from "react-icons/ri";

function SearchComponent({ searchCourse, courseSearchUserFunction, cartItemCount }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/home');
  };

  return (
    <header className="App-header">
      <RiCornerUpLeftDoubleLine className='arrow' onClick={handleBackClick} />
      <h1 className='Shopcart'>Shopping Cart</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for Products..."
          value={searchCourse}
          onChange={courseSearchUserFunction}
        />
      </div>
      <div className='fill'>
        <Link to="UserCartComponent">
          <RiShoppingBag3Fill />
          <span className="cart-count">{cartItemCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default SearchComponent;
