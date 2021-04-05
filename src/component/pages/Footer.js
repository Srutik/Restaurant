import React from 'react';
import './Footer.css';

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container' id='about'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Visit Once for an amazing Experience.
        </p>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'><i class="fab fa-instagram"></i> Instagram</Link>
            <Link to='/'><i class="fab fa-facebook-f"></i> Facebook</Link>
            <Link to='/'><i class="fab fa-youtube"></i> Youtube</Link>
            <Link to='/'><i class="fab fa-twitter"></i> Twitter</Link>
          </div>
        </div>
      </div>
     
      
    </div>
  );
}

export default Footer;