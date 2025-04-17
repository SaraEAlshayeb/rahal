import React, { useState } from 'react';
import './Login.css'; // reusing styles from complaints
import regBackground from './regBackground.png';

function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 1, from: "Dammam", to: "Riyadh", date: "2025-04-15", name: "Sara", gender: "Female" },
    { id: 2, from: "Unaizah", to: "Riyadh", date: "2025-04-16", name: "Saud", gender: "Male" },
    { id: 3, from: "Dhahran", to: "Jubail", date: "2025-04-17", name: "Mona", gender: "Female" },
    { id: 4, from: "Jeddah", to: "Makkah", date: "2025-04-18", name: "Farah", gender: "Female" },
  ]);

  const handleRemove = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div
      style={{
        background:"linear-gradient(to top, rgb(246, 244, 240) 60%, rgba(247, 241, 211, 0.71) 100%)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div style={{ paddingTop: '100px' }}>
        {/* Search and Filter */}
        <div className="search-filter-bar">
          <div className="search-group">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search notifications..."
              className="search-input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filter">Filter</label>
            <select id="filter" className="filter-dropdown">
              <option value="">All</option>
              <option value="latest">Latest</option>
              <option value="name">Name A-Z</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="page-center">
          {notifications.map((n) => (
            <div key={n.id} className="item-box">
              <div className="item-content">
                <div className="item-info">
                  <h5 className="passenger-header">
                    There is a passenger who wants to join your ride
                  </h5>
                  <p className="item-date">{n.date}</p>
                  <p className="item-sub"><strong>From:</strong> {n.from}</p>
                  <p className="item-sub"><strong>To:</strong> {n.to}</p>
                  <p className="item-sub"><strong>Passenger:</strong> {n.name}</p>
                  <p className="item-sub"><strong>Gender:</strong> {n.gender}</p>
                </div>
              </div>

              <div className="item-buttons" style={{ marginTop: 'auto', alignSelf: 'flex-end' }}>
    <button className="btn btn-outline"  onClick={() => handleRemove(n.id)}>
      Reject
    </button>
    <button className="btn btn-filled" background="#27445D" onClick={() => handleRemove(n.id)}>
      Accept
    </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notification;
