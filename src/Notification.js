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
        const res = await fetch(`http://localhost:5000/api/notifications/${driverId}`);
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
  const handleRemove = (id) => {
    console.log("Removed notification with ID:", id);
    setNotifications(prev => prev.filter((_, index) => index !== id));
  };
  return (
    <div className="page-center" style={{ paddingTop: '100px' }}>
      {notifications.length === 0 ? (
        <p style={{ textAlign: "center" }}>No new notifications.</p>
      ) : (
        notifications.map((n, index) => (
          <div key={index} className="item-box">
            <div className="item-content">
              <div className="item-info">
                <h5 className="passenger-header">
                  A passenger wants to join your ride
                </h5>
                <p className="item-date">{new Date(n.date).toLocaleDateString()}</p>
                <p className="item-sub"><strong>From:</strong> {n.from}</p>
                <p className="item-sub"><strong>To:</strong> {n.to}</p>
                <p className="item-sub"><strong>Passenger:</strong> {n.passengerName}</p>
              </div>
            </div>
            <div className="item-buttons" style={{ marginTop: 'auto', alignSelf: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => console.log("Rejecting")}>
                Reject
              </button>
              <button className="btn btn-filled" style={{ background: "#27445D" }} onClick={() => console.log("Accepting")}>
                Accept
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Notification;