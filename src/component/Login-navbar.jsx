import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login-navbar.scss'

function LoginNavbar() {
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
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>  
        <i class="fas fa-utensils"></i>  
        </Link>

        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Dine Fine   
        </Link>
         
        <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/admin-login' className='nav-links' onClick={closeMobileMenu}>
                Admin
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/manager-login'
                className='nav-links'
                onClick={closeMobileMenu}>
                 Manager
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cook-login'
                className='nav-links'
                onClick={closeMobileMenu}>
                  Cook
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/waiter-login'
                className='nav-links'
                onClick={closeMobileMenu}>
                  Waiter
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default LoginNavbar;