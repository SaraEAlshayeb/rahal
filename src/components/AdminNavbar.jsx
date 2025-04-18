import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

function AdminNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar px-3">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/adminmenu">
                    <img src="/Rahal_Logo.png" alt="logo" height="40" className="me-2" />
                    <img src="/Rahal.png" alt="text-logo" height="30" />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="adminNavbar">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item"><NavLink to="/adminmenu" className="nav-link">Home</NavLink></li>
                        <li className="nav-item"><NavLink to="/approve-drivers" className="nav-link">Requests</NavLink></li>
                        <li className="nav-item"><NavLink to="/manage-communities" className="nav-link">Communities</NavLink></li>
                        <li className="nav-item"><NavLink to="/complaints" className="nav-link">Complaints</NavLink></li>
                        <li className="nav-item"><NavLink to="/manage-profile" className="nav-link">Users</NavLink></li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <Link to="/notifications">
                            <img src="/2.png" alt="notification" height="27" />
                        </Link>
                        <Link to="/profile">
                            <img src="/1.png" alt="profile" height="27" />
                        </Link>
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
