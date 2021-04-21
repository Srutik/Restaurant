import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { HashLink as Link} from 'react-router-hash-link';
import './Navbar.scss'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
        <Link to='#' smooth duration={2000} className='navbar-logo' onClick={closeMobileMenu}>  
        <i class="fas fa-utensils"></i>  
        </Link>

        <Link to='#' smooth className='navbar-logo' onClick={closeMobileMenu}>
            Dine Fine   
        </Link>
         
        <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menudata active' : 'nav-menudata'}>
            <li className='nav-item'>
              <Link to='#' smooth duration={2000} className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='#card'
                smooth
                duration={2000}
                className='nav-links'
                onClick={closeMobileMenu}>
                 Special Items
              </Link>
            </li>
          

            <li className='nav-item'>
              <Link
                to='#about'
                smooth
                duration={2000}
                className='nav-links'
                onClick={closeMobileMenu}>
                  About Us
              </Link>
            </li>

            <li>
              <Link
                to='/Login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
          </ul>
          <Link to='/Login'>
            {button && <Button buttonStyle='btn--outline'>Login</Button>}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;