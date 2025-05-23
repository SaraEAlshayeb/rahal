import React, { useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import regBackground from './regBackground.png';
 
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
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, gender, phone } = form;
 
    // ## Frontend validation
    if (!name || !email || !password || !gender || !phone) {
      alert('All fields are required');
      return;
    }
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.(com)$/i;
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
 
    // ## Send all user info to backend
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, gender, phone }) // ✅ send all fields
      });
 
      const data = await response.json();
 
      if (response.ok) {
        alert(`Registration successful! Welcome ${data.name}`);
        navigate('/login');
      } else {
        // ## Handle duplicate email
        if (response.status === 409) {
          alert("This email is already registered. Please use a different one.");
        } else {
          alert(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong during registration');
    }
  };
 
  return (
    <div className={"register-wrapper"}
    >
      <div>
        <h1 className={"register-title"}>Create Account</h1>
      </div>
 
      <p className="subtitle">Join Rahal</p>
 
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
 
        {/* ## Submit inside the form */}
        <div className="button-container">
          <button type="submit">Sign Up</button>
          <p className="register-link">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
 
export default Register;