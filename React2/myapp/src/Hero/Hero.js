import "./Hero.css";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div>
       <section id ="hero">
      <div className="h-cont">
        <div className="h-left">
          <h1 className="heading">
            THE HIGH 
          </h1>
          <h1 className="heading">  STANDARDS IN </h1>
          <h1 className="heading">MEDICINE SUPPLIES</h1>
          <button className="btn"><Link to="/Whole">Shop Now</Link> </button>
        </div>
        <div className="h-right">
          <img src="gifgit.png"  alt=" Nothing" className="img"/>
        </div>
        
      
      </div>
      </section>
    </div>
  )
}

export default Hero

