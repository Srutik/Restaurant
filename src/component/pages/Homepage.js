import React from 'react';
import Foods from './Items';
import Navbar from './Navbar';
import Section from './Section';
import Footer from './Footer';
import './Homepage.css';

function Homepage() {
    return (
        <>
        <Navbar />
        <Section />
        <Foods />
        <Footer />
        </>
    )
}

export default Homepage;