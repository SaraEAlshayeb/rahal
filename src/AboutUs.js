import React from 'react';
import './AboutUs.css';
import { useNavigate } from "react-router-dom";
function AboutUs() {
    const navigate = useNavigate();
    return (
        <div className="about-page">

            <nav className="navbar-aboutus">
                <div className="navbar-left">
                    <img src="/Rahal.png" alt="Logo" className="navbar-logo" />
                </div>

                <div className="navbar-center">
                    <a href="#hero" className="nav-link">Home</a>
                    <a href="#why-us" className="nav-link">Why Us</a>
                    <a href="#about" className="nav-link">About</a>
                </div>

                <div className="navbar-right">
                    <a href="/login" className="login-button" onClick={() => navigate('/login')}>Login</a>
                </div>
            </nav>


            {/* Section 1: Hero Image with overlay text */}
            <section className="hero-section" id="hero">
                <img src="/AboutUsImage.png" alt="Hero" className="hero-image" />
                <div className="hero-text">
                    <br/><br/>
                    <h1>Share the Journey, Split the Cost, <br/>Make New Connections</h1>
                    <br/><br/>
                    <p>Rahal helps you post and find rides for long-distance travel. Share your journey with like-minded passengers, <br/>split expenses fairly, and enjoy meaningful connections on the road.</p>
                    <div className="hero-buttons-inline">
                        <button className="login-btn" onClick={() => navigate('/login')} >Login</button>
                        <span className="register-inline">
    Don’t have an account? <a href="/register" onClick={() => navigate('/register')}>Register</a>
  </span>
                    </div>

                </div>


            </section>


            {/* Section 2: Why Us */}
            <section className="why-us-section" id="about">
                <h2>Why Choose Us?</h2>
                <div className="why-us-cards">
                    <div className="card">

                        <h3>Affordable</h3>
                        <p>Whether you're driving or riding, sharing intercity trips helps you save money by dividing fuel costs—making travel easier on your wallet.</p>
                    </div>
                    <div className="card">

                        <h3>Social</h3>
                        <p>Every trip is a chance to meet someone new, share stories, and turn your journey into a meaningful experience.</p>
                    </div>
                    <div className="card">

                        <h3>Sustainable</h3>
                        <p>By reducing the number of cars on the road, ride-sharing helps cut emissions and supports a greener future.</p>
                    </div>
                </div>
            </section>

            {/* Section 3: Quote */}
            <section className="quote-section" id="quote">
                <blockquote>
                    “Great solutions are born from real struggles. Together, we built Rahal to help others move forward.”
                </blockquote>
                <p className="author">– Rahal Founders</p>
            </section>
        </div>
    );
}

export default AboutUs;
