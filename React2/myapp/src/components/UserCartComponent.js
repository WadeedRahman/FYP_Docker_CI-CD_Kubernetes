import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function UserCartComponent({
  cartCourses,
  deleteCourseFromCartFunction,
  totalAmountCalculationFunction,
  setCartCourses,
  updateCartItemCount,
  cartItemCount
}) {
  const navigate = useNavigate(); // Get navigate object

  const sessionToken = localStorage.getItem('session_token'); // Retrieve session_token from local storage

  // Function to update backend cart
  const updateBackendCart = async (product, quantity) => {
    try {
      const response = await fetch("http://localhost:8080/update-cart.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_token: sessionToken,
          product_id: product.product_id,
          quantity: quantity,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error('Failed to update cart in backend');
      }
    } catch (error) {
      console.error('Error updating cart in backend:', error);
    }
  };

  // Function to place an order
  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:8080/place_order.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_token: sessionToken,
          total_items: cartCourses.reduce((total, item) => total + item.quantity, 0),
          total_price: totalAmountCalculationFunction(),
          order_date: new Date().toISOString(),
          products: cartCourses.map(item => ({
            product_id: item.product.product_id,
            quantity: item.quantity,
            price: item.product.price,
          }))
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Clear cart and navigate to checkout or success page
        setCartCourses([]);
        updateCartItemCount(0);
        navigate('/checkout'); // Navigate to checkout or success page
      } else {
        throw new Error(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error.message);
      // Handle error as needed, e.g., show error message to the user
    }
  };

  const handleOrderHistoryClick = () => {
    navigate('/History');
  };

  // Handler for checkout button click
  const handleCheckoutClick = () => {
    if (cartCourses.length > 0 && totalAmountCalculationFunction() > 0) {
      placeOrder(); // Place order if cart is not empty
    }
  };

  // Handler for quantity change buttons (+/-)
  const handleQuantityChange = (product, delta) => {
    setCartCourses((prevCartCourses) => {
      let updatedCart = prevCartCourses.map((item) =>
        item.product.product_id === product.product_id
          ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
          : item
      );

      updatedCart = updatedCart.filter(item => item.quantity > 0);

      // Update cart item count
      updateCartItemCount(updatedCart.length);

      // Update backend with the new quantity
      const updatedItem = updatedCart.find(item => item.product.product_id === product.product_id);
      updateBackendCart(product, updatedItem ? updatedItem.quantity : 0);

      return updatedCart;
    });
  };

  useEffect(() => {
    // Debugging to ensure cartCourses is being read correctly
    // console.log('cartCourses:', cartCourses);
  }, [cartCourses]);

  return (
<>
<div className={`cart `}>
      <h2>My Cart</h2>
      {console.log(cartCourses)}
      {cartCourses.length === 0 ? (
        <div>
          <p className="empty-cart">Your cart is empty.</p>
          <p className="empty-cart">Please select some product to add in the cart.</p>
        </div>
        // <div className="empty-cart-message">
        //   <p>Your cart is empty.</p>
        //   <p>Explore our products and add items to your cart!</p>
        //   <button onClick={() => navigate('/products')} className="browse-products-btn">
        //     Browse Products
        //   </button>
        // </div>
      ) : (
        <div>
          <ul>
            {cartCourses.map((item) => (
              <li key={item.product.product_id} className="cart-item">
                <div>
                  <div className="item-info">
                    <div className="item-details">
                      <h3>{item.product.name}</h3>
                      <p>Price: Rs {item.product.price}</p>
                    </div>
                  </div>
                  <div>
                    <div className="item-actions">
                      <button
                        className="remove-button"
                        onClick={() => {
                          handleQuantityChange(item.product, -item.quantity);
                          deleteCourseFromCartFunction(item.product);
                        }}
                      >
                        Remove Product
                      </button>
                      <div className="quantity">
                        <button
                          style={{ margin: "1%" }}
                          onClick={() => handleQuantityChange(item.product, 1)}
                        >
                          +
                        </button>
                        <p className='quant'>{item.quantity} </p>
                        <button
                          onClick={() => handleQuantityChange(item.product, -1)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-section">
            <div className="checkout-total">
              <p className="total">Total Amount: Rs {totalAmountCalculationFunction()}</p>
            </div>
            <button
              className="checkout-button"
              disabled={cartCourses.length === 0 || totalAmountCalculationFunction() === 0}
              onClick={handleCheckoutClick}
            >
              Order Now
            </button>
          </div>
        </div>
      )}
      <div>
        <button onClick={handleOrderHistoryClick} className='history'>
          Order History
        </button>
      </div>
    </div>
</>
  );
}

export default UserCartComponent;
