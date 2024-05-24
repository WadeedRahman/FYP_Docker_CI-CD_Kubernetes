import React from 'react'
import "./Checkout.css";
const Checkout = () => {
  return (
    <div className='checkout'><form className='check'>
    <div>
    <h1>Customer Information</h1>
    <div>
    <label className='FN'>First Name</label><input
type='username'
    placeholder='Ammara'
/></div>
<div>
<label className='FN'>Last name</label>
<input
type='username'  
    placeholder='Wadeed'
/></div>
<div>
<label className='FN'>Email</label>
<input 
  
    placeholder='wa@example.com'
    type='email'  
/>
</div>
    </div>
    <div>
      <h1> Payment Method</h1>    
    <input type='checkbox' checked >
 </input><label className='cash'>Cash on Delivery</label>
    </div>
    <div>
        <h1>Shipping</h1>
        <label className='FN'>Address</label>
<input 
  
    placeholder='flaa flaa'
    type='text'  
/>
<div>
<label className='FN'>City</label>
<input 
  
    placeholder='Jungle'
    type='text'  
/>
</div>

    </div>
    <input type="Submit" className="button" value={"Submit"}></input>
  <input type='reset' value={"Reset"} className="button"></input> 
    </form>

    </div>
  )
}
export default Checkout;