import React from 'react';
import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">

            <div className="logo-container">
                <img src="/Rahal_Logo.png" alt="logo" height="50px" />
                <img src="/Rahal.png" alt="text-logo" height="40px" style={{ padding: '0px', margin:"0px" }} />
            </div>

            {/* Menu */}
            <div className="menu">
                <NavLink to="/home" className="nav-link">Home</NavLink>

                <NavLink to="/community" className="nav-link" activeClassName="active">
                    Community
                </NavLink>
                <NavLink to="/book-ride" className="nav-link" activeClassName="active">
                    Book Ride
                </NavLink>
                <NavLink to="/post-ride" className="nav-link" activeClassName="active">
                    Post Ride
                </NavLink>
                <NavLink to="/history" className="nav-link" activeClassName="active">
                    Rides
                </NavLink>
                <NavLink to="/Driver" className="nav-link" activeClassName="active">
                    Start Driving
                </NavLink>

            </div>
            <div className="icon-group">
                <Link to="/notifications">
                    <button className="notification-button">
                        <img src="/notification2.png" alt="notification" />
                    </button>
                </Link>
                <div style={{ marginRight: "30px" }}>
                    <Link to="/profile">
                        <button
                            style={{
                                backgroundColor: '#71BBB2',
                                border: 'none',
                                borderRadius: '50%',
                                padding: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            <img src="/profile.png" alt="Profile" style={{ height: '30px', width: '30px' }} />
                        </button>
                    </Link>
                </div>

                {/* <button className="profile-button">
    <img src="/profile.png" alt="profile" />
  </button> */}
            </div>
        </div>

    );
}

export default Navbar;
