import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import { useNavigate } from "react-router-dom";

function AboutUs() {
    const navigate = useNavigate();
    const [showHero, setShowHero] = useState(false);
    const [showWhyUs, setShowWhyUs] = useState(false);
    const [showQuote, setShowQuote] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowHero(true), 300);
        setTimeout(() => setShowWhyUs(true), 800);
        setTimeout(() => setShowQuote(true), 1300);
    }, []);

    return (
        <div className="aboutus-about-page">
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

            {/* Hero Section */}
            <section className={`aboutus-hero-section fade-section ${showHero ? 'visible' : ''}`} id="hero">
                <img src="/AboutUsImage.png" alt="Hero" className="aboutus-hero-image" />
                <div className="aboutus-hero-text">
                    <h1>Share the Journey, Split the Cost,<br />Make New Connections</h1>
                    <p>
                        Rahal helps you post and find rides for long-distance travel.
                        Share your journey with like-minded passengers,
                        split expenses fairly, and enjoy meaningful connections on the road.
                    </p>
                    <div className="aboutus-hero-buttons-inline">
                        <button className="aboutus-login-btn" onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <span className="aboutus-register-inline">
                            Don’t have an account?{' '}
                            <a href="/register" onClick={(e) => {
                                e.preventDefault();
                                navigate('/register');
                            }}>
                                Register
                            </a>
                        </span>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section className={`aboutus-why-us-section fade-section ${showWhyUs ? 'visible' : ''}`} id="why-us">
                <h2>Why Choose Us?</h2>
                <div className="aboutus-why-us-cards">
                    <div className="aboutus-card">
                        <h3><b>Affordable</b></h3>
                        <p>Whether you're driving or riding, sharing intercity trips helps you save money by dividing fuel costs—making travel easier on your wallet.</p>
                    </div>
                    <div className="aboutus-card">
                        <h3><b>Social</b></h3>
                        <p>Every trip is a chance to meet someone new, share stories, and turn your journey into a meaningful experience.</p>
                    </div>
                    <div className="aboutus-card">
                        <h3><b>Sustainable</b></h3>
                        <p>By reducing the number of cars on the road, ride-sharing helps cut emissions and supports a greener future.</p>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className={`aboutus-quote-section fade-section ${showQuote ? 'visible' : ''}`} id="about">
                <blockquote>
                    “Great solutions are born from real struggles. Together, we built Rahal to help others move forward.”
                </blockquote>
                <p className="aboutus-author">– Rahal Founders</p>
            </section>
        </div>
    );
}

export default AboutUs;
