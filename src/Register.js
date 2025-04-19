import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import regBackground from './regBackground.png'; 
import { useNavigate } from 'react-router-dom';


function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, gender, phone } = form;
  
    if (!name || !email || !password || !gender || !phone) {
      alert('All fields are required');
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]/i;
    if (!emailPattern.test(email)) {
      alert('Email must be valid and end with .com');
      return;
    }
  
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
  
    const phonePattern = /^05\d{8}$/;
    if (!phonePattern.test(phone)) {
      alert('Phone number must start with 05 and be exactly 10 digits');
      return;
    }
  
    navigate('/home'); 
  };
  
  

  return (
    <div
    className="login-wrapper"
    style={{
      backgroundImage: `url(${regBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
  
      <div className="Register-title">
        <h1>Create Account</h1>
      </div>

      <p className="subtitle">Join the Rahal ride</p>

      <form className="register-form" onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
  type="email"
  name="email"
  placeholder="Ex.example@hotmail.com"
  value={form.email}
  onChange={handleChange}
  required
  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$"
  title="Email must contain @ and end with .com"
/>

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={8}
        />

        <label>Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="05XXXXXXXX"
          value={form.phone}
          onChange={handleChange}
          required
          pattern="05\d{8}"
          maxLength={10}
          minLength={10}
        />
      </form>

      <div className="button-container">
        <button onClick={handleSubmit}>Sign In</button>
        <p className="register-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
