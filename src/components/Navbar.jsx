import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar px-3">
            <div className="container-fluid">
                {/* Logo Section */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/Rahal_Logo.png" alt="logo" height="40" className="me-2" />
                    <img src="/Rahal.png" alt="text-logo" height="30" />
                </Link>

                {/* Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu Items */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">  {/* Added mx-auto to center items */}
                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/community" className="nav-link">Community</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/book-ride" className="nav-link">Book Ride</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/post-ride" className="nav-link">Post Ride</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/history" className="nav-link">History</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Driver" className="nav-link">Start Driving</NavLink>
                        </li>
                    </ul>

                    {/* Right Icons */}
                    <div className="d-flex align-items-center gap-3">
                        {/* Notification */}
                        <Link to="/notifications">
                            <img src="/2.png" alt="notification" height="27" width="27" />
                        </Link>

                        {/* Profile */}
                        <Link to="/profile">
                            <img src="/1.png" alt="profile" height="27" width="27" />
                        </Link>

                        {/* Logout */}
                        <Link to="/login" onClick={() => localStorage.clear()}>
                            <img src="/3.png" alt="logout" height="27" width="27" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
