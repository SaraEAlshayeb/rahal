import React, { useState } from 'react';
import './Login.css'; 
import regBackground from './regBackground.png'; 

function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 1, from: "Dammam", to: "Riyadh", date: "2025-04-15", name: "Sara", gender: "Female" },
    { id: 2, from: "Unaizah", to: "Buraydah", date: "2025-04-16", name: "Saud", gender: "Male" },
    { id: 3, from: "Dhahran", to: "Jubail", date: "2025-04-17", name: "Mona", gender: "Female" },
    { id: 4, from: "Jeddah", to: "Makkah", date: "2025-04-18", name: "Farah", gender: "Male" },
 
  ]);

  const handleRemove = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    
    <div
      className="notification-wrapper"
      style={{
        backgroundImage: `url(${regBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
<div className="Register-title">
  <h1>Notifications!</h1>
</div>
      <div className="notification-container">
        {notifications.map((n) => (
          <div key={n.id} className="notification-card">
            <p className="notification-header">🚗 There is a passenger who wants to join your ride</p>
            <p className='notification-p'><strong>From:</strong> {n.from}</p>
            <p className='notification-p'><strong>To:</strong> {n.to}</p>
            <p className='notification-p'><strong>Date:</strong> {n.date}</p>
            <p className='notification-p'><strong>Passenger Name:</strong> {n.name}</p>
            <p className='notification-p'><strong>Gender:</strong> {n.gender}</p>

            <div className="notification-actions">
              <button className="accept-btn" onClick={() => handleRemove(n.id)}>Accept</button>
              <button className="reject-btn" onClick={() => handleRemove(n.id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
