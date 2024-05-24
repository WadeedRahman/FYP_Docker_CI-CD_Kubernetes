import React from "react";
import { Link } from "react-router-dom";
function Cart(props){
  //  console.log(props);

    return( <><div className="cards">
    <div className="card">
    
<img src={props.imgsrc}  alt="my pic" className="card_img" />
    <div className="card-info"> 
    <span className="card_category" >{props.title}
    </span>
    <h3 className="card_title"  >{props.price}  
    </h3>
    
    
        <button className="button"><Link to="/Login">Add To Cart </Link></button>
   
    </div>
    </div>
    </div>
</>
    )
}
export default Cart;