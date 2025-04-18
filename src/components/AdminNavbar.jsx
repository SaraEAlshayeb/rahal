import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function AdminNavbar() {
    return (
        <div className="navbar">
            {/* Logo */}
            <div className="logo-container">
                <img src="/Rahal_Logo.png" alt="logo" height="50px" />
                <img src="/Rahal.png" alt="text-logo" height="40px" style={{ padding: '0px', margin: '0px' }} />
            </div>

            {/* Admin Menu */}
            <div className="menu">
                <NavLink to="/adminmenu" className="nav-link">Home</NavLink>
                <NavLink to="/approve-drivers" className="nav-link">Requests</NavLink>
                <NavLink to="/manage-communities" className="nav-link">Communities</NavLink>
                <NavLink to="/complaints" className="nav-link">Complaints</NavLink>
                <NavLink to="/manage-profile" className="nav-link">Users</NavLink>
            </div>

            {/* Icons */}
            <div className="icon-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '30px' }}>
                {/* Notification */}
                <Link to="/notifications">
                    <button className="notification-button">
                        <img src="/2.png" alt="notification" style={{ height: '28px', width: '28px' }} />
                    </button>
                </Link>

                {/* Profile */}
                <Link to="/profile">
                    <button style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer' }}>
                        <img src="/1.png" alt="Profile" style={{ height: '27px', width: '27px' }} />
                    </button>
                </Link>

                {/* Logout */}
                <Link to="/login" onClick={() => localStorage.clear()}>
                    <button style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer' }}>
                        <img src="/3.png" alt="Logout" style={{ height: '27px', width: '27px' }} />
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default AdminNavbar;
