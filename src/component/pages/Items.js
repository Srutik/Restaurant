import React from 'react';
import './Items.scss';
import CardItem from './Carditem';

function Foods() {
  return (
    <div className='cards' id="card">
      <div className="head-done">Check out Our Specials!</div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/coffee.jpg'
              text='CAFFÈ LATTE'
              label='$8.99'
            />
            <CardItem 
              src='images/pasta.jpg'
              text='Red Sauce Special Pasta'
              label='$14.99'
            />
            <CardItem
              src='images/toast.jpg'
              text='Breakfast Specials'
              label='$9.99'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Foods;