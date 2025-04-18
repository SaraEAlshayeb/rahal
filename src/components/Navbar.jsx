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
                    History
                </NavLink>
                <NavLink to="/Driver" className="nav-link" activeClassName="active">
                    Start Driving
                </NavLink>

            </div>
            <div className="icon-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '30px' }}>
  {/* Notification */}
  <Link to="/notifications">
    <button className="notification-button">
      <img src="/2.png" // your image path
           alt="notification"
           style={{ height: '28px', width: '28px' }}  />
    </button>
  </Link>

  {/* Profile */}
  <Link to="/profile">
  <button
    style={{
      background: 'none',
      border: 'none',
      padding: '0',
      cursor: 'pointer'
    }}
  >
    <img
      src="/1.png" // your image path
      alt="Profile"
      style={{ height: '27px', width: '27px' }}
    />
  </button>
</Link>


  {/* Logout */}
  <Link to="/login" onClick={() => localStorage.clear()}>
    <button
      style={{
        background: 'none',
        border: 'none',
        padding: '0',
        cursor: 'pointer'
      }}
    >
      <img
        src="/3.png"
        alt="Logout"
        style={{ height: '27px', width: '27px' }}
      />
    </button>
  </Link>
</div>


        </div>

    );
}

export default Navbar;
