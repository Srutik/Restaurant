import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
// import Modal from 'react-modal';
import PopUp from './Book-table';
import * as RiIcons from 'react-icons/ri';
import { RiTableFill } from "react-icons/ri";
import { HashLink as Link } from 'react-router-hash-link';
import './User-Nav.scss';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const Popup = props => {
    const [person, setPerson] = useState();

    async function handleReservation() {
      let data = { person }
      try {
        await fetch("http://localhost:8020/book/reservation", {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ` + localStorage.getItem("token")
          },
          body: JSON.stringify(data),
        })
        alert(" You are successfully completed reservation ! ")
      }
      catch (error) {
        alert(error)
      }
    }
    
    return (
      <div className="popup-box">
        <div className="box">
          <div className="form-group">
            <label htmlFor="phone">Enter Person</label>
            <input maxLength="3" type="text" name="person" placeholder="Total Person" onChange={e => setPerson(e.target.value)}/>
            <button onClick={handleReservation}>Test button</button>
          </div>
          
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    );
  };



  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='#UserSection' smooth duration={2000} className='navbar-logo' onClick={closeMobileMenu}>
            <i class="fas fa-utensils"></i>
          </Link>

          <Link to='#UserSection' smooth duration={2000} className='navbar-logo' onClick={closeMobileMenu}>
            Dine Fine
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'navmenu-menubar active' : 'navmenu-menubar'}>
            <li className='nav-item'>
              <Link
                to='/menu'
                className='nav-links'
                onClick={closeMobileMenu}>
                Menu
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/Offer-page'
                className='nav-links'
                onClick={closeMobileMenu}>
                Offers
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='booktable'
                className='nav-links'
                onClick={closeMobileMenu}>
                Book Table
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/orders'
                className='nav-links'
                onClick={closeMobileMenu}>
                View Order
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/cart'
                className='nav-links'
                onClick={closeMobileMenu}>
                Cart {props.index}
                <div className="icon_link">
                  <i class="fas fa-shopping-cart"></i>
                </div>
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/UserProfile' className='nav-links' onClick={closeMobileMenu}>
                Profile
                <div className="icon_link">
                  <i class="fas fa-user-circle"></i>
                </div>
              </Link>
            </li>

            <li>
              <Link
                className='nav-links-mobile'
                onClick={togglePopup}>
                Reservation
              </Link>
            </li>
            <div className="set-btn_ctr">
              {button && <Button onClick={togglePopup} buttonStyle='btn--outline'>Reservation</Button>}
            </div>
            {isOpen && (
              <Popup
                content={
                  <>
                  </>
                }
                handleClose={togglePopup}
              />
            )}

            <li>
              <Link
                to='/'
                className='nav-links-mobile'
                onClick={closeMobileMenu}>
                Logout
              </Link>
            </li>
          </ul>
          <Link to='/'>
            {button && <Button buttonStyle='btn--outline'>Logout</Button>}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;