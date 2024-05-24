import Card from "./Cart";
import Sdata from "./Sdata";
import "./Cart.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Image = () => {
    return (
        <>
        <Navbar/>
<Card 
imgsrc={Sdata[0].imgsrc}
title={Sdata[0].title}
price={Sdata[0].price}
link={Sdata[0].link} />
<Card 
imgsrc={Sdata[1].imgsrc}
title={Sdata[1].title}
price={Sdata[1].price}
link={Sdata[1].link} 
 />
<Card
imgsrc={Sdata[2].imgsrc}
title={Sdata[2].title}
price={Sdata[2].price}
link={Sdata[2].link} 
 />
<Card
imgsrc={Sdata[3].imgsrc}
title={Sdata[3].title}
price={Sdata[3].price}
link={Sdata[3].link} 
 />
<Card
imgsrc={Sdata[4].imgsrc}
title={Sdata[4].title}
price={Sdata[4].price}
link={Sdata[4].link} 
 />
 <Card
imgsrc={Sdata[5].imgsrc}
title={Sdata[5].title}
price={Sdata[5].price}
link={Sdata[5].link} 
 />
 <Card
imgsrc={Sdata[6].imgsrc}
title={Sdata[6].title}
price={Sdata[6].price}
link={Sdata[6].link} 
 />
 <Card
imgsrc={Sdata[7].imgsrc}
title={Sdata[7].title}
price={Sdata[7].price}
link={Sdata[7].link} 
 />
 <Card
imgsrc={Sdata[8].imgsrc}
title={Sdata[8].title}
price={Sdata[8].price}
link={Sdata[8].link} 
 />
 <Card
imgsrc={Sdata[9].imgsrc}
title={Sdata[9].title}
price={Sdata[9].price}
link={Sdata[9].link} 
 />
</>
    )
}
export default Image;
