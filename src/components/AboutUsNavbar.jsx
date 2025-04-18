// components/AboutUsNavbar.js
import React from 'react';
import '../AboutUs.css'; // reuse your AboutUs CSS for styling

function AboutUsNavbar({ navigate }) {
    return (
        <nav className="aboutus-navbar">
            <div className="aboutus-navbar-left">
                <img src="/Rahal.png" alt="Logo" className="aboutus-navbar-logo" />
            </div>

            <div className="aboutus-navbar-center">
                <a href="#hero" className="aboutus-nav-link">Home</a>
                <a href="#why-us" className="aboutus-nav-link">Why Us</a>
                <a href="#about" className="aboutus-nav-link">About</a>
            </div>

            <div className="aboutus-navbar-right">
                <button className="aboutus-login-button" onClick={() => navigate('/login')}>
                    Login
                </button>
            </div>
        </nav>
    );
}

export default AboutUsNavbar;
