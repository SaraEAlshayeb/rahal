import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('All fields are required.');
            return;
        }
        localStorage.setItem("userEmail", email);

        if (email === 'admin@hotmail.com') {
            navigate('/AdminMenu');
        } else {
            navigate('/home');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left-panel">
                <img src="login.png" alt="Welcome Visual" className="login-full-image" />
            </div>
            <div className="login-right-panel">
                <div className="login-form-container">
                    <h2>Welcome to Rahal</h2>
                    <p>Your most convenient ride</p>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@hotmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    <p className="login-signup-text">
                        Don’t have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>

    );
}

export default Login;
