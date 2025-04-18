import React, { useState } from 'react';
import './Login.css';
import Background from './background.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



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
    <div
      className="login-wrapper"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
    

     
      <h1 className="login-title">Welcome To Rahal</h1>
      <p className="subtitle">Your most convenient ride</p>

  
      
      <div className="login-form">
  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input
      id="email"
      type="email"
      placeholder="Ex.example@hotmail.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="password">Password:</label>
    <input
      id="password"
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
</div>

    
      <div className="button-container">
        <button onClick={handleLogin}>Login</button>
        <p className="register-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
