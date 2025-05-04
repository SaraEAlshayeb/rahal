import React, { useState, useEffect } from "react";
import "./Login.css";
const API_URL = process.env.REACT_APP_API_URL;

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          alert("User not logged in");
          return;
        }

        const userRes = await fetch(`http://localhost:5000/api/users/${email}`);
        const user = await userRes.json();
        const userId = user._id;
        const role = localStorage.getItem("role");
        const path = role === "driver" ? "driver" : "user";
        const response = await fetch(
          `http://localhost:5000/api/notifications/${path}/${userId}`
        );

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
      const response = await fetch(
        "http://localhost:5000/api/notifications/respond",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "driver-id": localStorage.getItem("userId"),
          },
          body: JSON.stringify({ notificationId, action, passengerId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNotifications((prev) =>
          prev.filter((n) => n.notificationId !== notificationId)
        );
      } else {
        alert(data.message || "Action failed.");
      }
    } catch (err) {
      console.error("Response error:", err);
      alert("Server error.");
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    const name = n.passengerName || n.driverName || "";
    const from = n.from || "";
    const to = n.to || "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      from.toLowerCase().includes(search.toLowerCase()) ||
      to.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (filter === "latest") {
    filteredNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filter === "oldest") {
    filteredNotifications.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (filter === "name") {
    filteredNotifications.sort((a, b) =>
      a.passengerName.localeCompare(b.passengerName)
    );
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(to top, rgb(246, 244, 240) 60%, rgba(247, 241, 211, 0.71) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div style={{ paddingTop: "100px" }}>
        {/* Search and Filter */}
        <div className="search-filter-bar">
          <div className="search-group">
            <input
              id="search"
              type="text"
              placeholder="Search notifications..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filter">Filter</label>
            <select
              id="filter"
              className="filter-dropdown"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
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
            <p style={{ textAlign: "center" }}>No new notifications.</p>
          ) : (
            filteredNotifications.map((n) => (
              <div key={n.notificationId} className="item-box">
                <div className="item-content">
                  <div className="item-info">
                    <h5 className="passenger-header">
                      {n.type === "request"
                        ? "There is a passenger who wants to join your ride"
                        : `${
                            n.driverName || "The driver"
                          } has responded to your request`}
                    </h5>
                    <p className="item-date">
                      {new Date(n.date).toLocaleDateString()}
                    </p>
                    <p className="item-sub">
                      <strong>From:</strong> {n.from}
                    </p>
                    <p className="item-sub">
                      <strong>To:</strong> {n.to}
                    </p>
                    {n.type === "request" ? (
                      <>
                        <p className="item-sub">
                          <strong>Passenger:</strong> {n.passengerName}
                        </p>
                        <p className="item-sub">
                          <strong>Gender:</strong> {n.passengerGender}
                        </p>
                      </>
                    ) : (
                      <p className="item-sub">
                        <strong>Status:</strong>{" "}
                        {n.status === "accept" ? "Accepted " : "Rejected "}
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons Section */}
                <div
                  className="item-buttons"
                  style={{ marginTop: "auto", alignSelf: "flex-end" }}
                >
                  {n.type === "request" ? (
                    <>
                      <button
                        className="btn btn-outline"
                        onClick={() =>
                          handleResponse(
                            n.notificationId,
                            "reject",
                            n.passengerId
                          )
                        }
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-filled"
                        style={{ background: "#27445D" }}
                        onClick={() =>
                          handleResponse(
                            n.notificationId,
                            "accept",
                            n.passengerId
                          )
                        }
                      >
                        Accept
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-filled"
                      style={{ backgroundColor: "#27445D" }}
                      onClick={async () => {
                        try {
                          // 1. Delete notification from DB
                          await fetch(
                            `http://localhost:5000/api/notifications/${n.notificationId}`,
                            {
                              method: "DELETE",
                            }
                          );

                          // 2. Remove from UI
                          setNotifications((prev) =>
                            prev.filter(
                              (item) => item.notificationId !== n.notificationId
                            )
                          );

                          // 3. Navigate
                          if (n.status === "accept") {
                            window.location.href = `/checkout/${n.rideId}`;
                          } else {
                            alert("Your request was rejected.");
                          }
                        } catch (error) {
                          console.error(
                            "Failed to delete notification:",
                            error
                          );
                          alert("Error deleting notification");
                        }
                      }}
                    >
                      {n.status === "accept" ? "Go to Checkout" : "OK"}
                    </button>
                  )}
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
