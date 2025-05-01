import React, { useState, useEffect } from 'react';
import './Login.css';

function Notification() {
  const [notifications, setNotifications] = useState([]);

 
  useEffect(() => {
    const fetchNotifications = async () => {
      const driverId = localStorage.getItem("userId");
  
      if (!driverId) {
        alert("Driver not logged in");
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/notifications/${driverId}`);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchNotifications();
  }, []);
  const handleResponse = async (notificationId, action, passengerId) => {
    try {
      const response = await fetch("http://localhost:5000/api/notifications/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "driver-id": localStorage.getItem("userId")
        },
        body: JSON.stringify({ notificationId, action, passengerId })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.notificationId !== notificationId));
      } else {
        alert(data.message || "Action failed.");
      }
    } catch (err) {
      console.error("Response error:", err);
      alert("Server error.");
    }
  };
  

  return (
    <div
      style={{
        background: "linear-gradient(to top, rgb(246, 244, 240) 60%, rgba(247, 241, 211, 0.71) 100%)",
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
          {notifications.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No new notifications.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.notificationId} className="item-box">
                <div className="item-content">
                  <div className="item-info">
                    <h5 className="passenger-header">
                      There is a passenger who wants to join your ride
                    </h5>
                    <p className="item-date">{new Date(n.date).toLocaleDateString()}</p>
                    <p className="item-sub"><strong>From:</strong> {n.from}</p>
                    <p className="item-sub"><strong>To:</strong> {n.to}</p>
                    <p className="item-sub"><strong>Passenger:</strong> {n.passengerName}</p>
                    <p className="item-sub"><strong>Gender:</strong> {n.passengerGender}</p>
                  </div>
                </div>
                <div className="item-buttons" style={{ marginTop: 'auto', alignSelf: 'flex-end' }}>
                <button
  className="btn btn-outline"
  onClick={() => handleResponse(n.notificationId, "reject", n.passengerId)}
>
  Reject
</button>
<button
  className="btn btn-filled"
  style={{ background: "#27445D" }}
  onClick={() => handleResponse(n.notificationId, "accept", n.passengerId)}
>
  Accept
</button>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
