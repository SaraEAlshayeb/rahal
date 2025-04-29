import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
     
        if (!email || !password) {
          alert('All fields are required.');
          return;
        }
     
        try {
          const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
     
          const data = await response.json();
     
          if (response.ok) {
            localStorage.setItem("userEmail", email);
            if (data.role === "admin") {
              navigate('/AdminMenu');
            } else {
              navigate('/home');
            }
          } else {
            alert(data.message || "Login failed");
          }
        } catch (error) {
          alert("Error connecting to server");
          console.error("Login error:", error);
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
