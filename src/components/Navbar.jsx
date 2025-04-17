import React from 'react';
import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">

            <div className="logo-container">
                <img src="/Rahal_Logo.png" alt="logo" height="50px" />
                <img src="/Rahal.png" alt="text-logo" height="20px" style={{ padding: '0px' }} />
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

            </div>
            <div className="icon-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '30px' }}>
  {/* Notification */}
  <Link to="/notifications">
    <button className="notification-button">
      <img src="/notification2.png" alt="notification" />
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
      src="/profile.png" // your image path
      alt="Profile"
      style={{ height: '35px', width: '35px' }}
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
        src="/logout2.png"
        alt="Logout"
        style={{ height: '30px', width: '30px' }}
      />
    </button>
  </Link>
</div>


        </div>

    );
}

export default Navbar;
