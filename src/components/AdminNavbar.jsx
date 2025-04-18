import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

function AdminNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar px-3">
            <div className="container-fluid">
                {/* Left: Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/adminmenu">
                    <img src="/Rahal_Logo.png" alt="logo" height="40" className="me-2" />
                    <img src="/Rahal.png" alt="text-logo" height="30" />
                </Link>

                {/* Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNavbar"
                    aria-controls="adminNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible content */}
                <div className="collapse navbar-collapse justify-content-between" id="adminNavbar">
                    {/* Centered Menu */}
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item"><NavLink to="/adminmenu" className="nav-link">Home</NavLink></li>
                        <li className="nav-item"><NavLink to="/approve-drivers" className="nav-link">Requests</NavLink></li>
                        <li className="nav-item"><NavLink to="/manage-communities" className="nav-link">Communities</NavLink></li>
                        <li className="nav-item"><NavLink to="/complaints" className="nav-link">Complaints</NavLink></li>
                        <li className="nav-item"><NavLink to="/manage-profile" className="nav-link">Users</NavLink></li>
                    </ul>

                    {/* Right: Logout Icon */}
                    <div className="d-flex align-items-center justify-content-end logout-icon">
                        <Link to="/login" onClick={() => localStorage.clear()}>
                            <img src="/3.png" alt="logout" height="27" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
