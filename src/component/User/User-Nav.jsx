import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import PopUp from './Pop-up';
import { HashLink as Link } from 'react-router-hash-link';
import './User-Nav.scss';
class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
 

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
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='#UserSection' smooth duration={2000} className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
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
                className='nav-links'
                onClick={togglePopup}>
                  Book Table
              </Link>
            </li>

            {isOpen && <PopUp
              handleClose={togglePopup}
            />}

              <li className='nav-item'>
              <Link
                to='/cart'
                className='nav-links'
                onClick={closeMobileMenu}>
                 Cart
                 <i class="fas fa-shopping-cart"></i>
              </Link>
            </li>

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