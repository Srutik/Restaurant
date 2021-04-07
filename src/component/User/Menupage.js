import React from 'react';
import { Link } from 'react-router-dom';
import Sidesection from './Sidesection'; 
import Indian from './Images/indian.jpg';
import Italian from './Images/Italian.jpg';
import Chinese from './Images/chinese.jpg';
import SouthIndian from './Images/SouthIndian.jpg';
import Dessert from './Images/desert.jpg';
import ColdDrink from './Images/Cold-drink.jpg';
import './Menupage.css';

function Menupage() {
  return (
  <div>
        <Sidesection />
          <div className='containers'>
            <Link to='/indian'>
          <div className="items">
         <img src={Indian} alt={1}/>
         <div className="Title">Indian</div>
          </div></Link>

          <Link to='/italian'>
          <div className="items">
         <img src={Italian} alt={2}/>
         <div className="Title">Italian</div> 
         </div></Link>

         <Link to='/Chinese'>
         <div className="items">
         <img src={Chinese} alt={3} />
         <div className="Title">Chinese</div> 
         </div></Link>

         <Link to='/South-Indian'>
         <div className="items">
         <img src={SouthIndian} alt={4}/>
         <div className="Title">South Indian</div> 
         </div></Link>

         <Link to='/Desserts'>
         <div className="items">
         <img src={Dessert} alt={5}/>
         <div className="Title">Dessert</div> 
         </div></Link>

         <Link to='/Cold-Drinks'>
         <div className="items">
         <img className='image-category' src={ColdDrink} alt={6} />
         <div className="Title">Cold Drink</div>
         </div> 
         </Link>
         </div>
         </div>
    
  );
}

export default Menupage;




