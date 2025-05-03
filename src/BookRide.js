import { User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookRide = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [filtered, setFiltered] = useState(null);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState(null);
  const [driverName, setDriverName] = useState("");
  const [bookingInProgress, setBookingInProgress] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          console.error("⚠️ No user email found in localStorage");
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        // Get the user’s ID from backend using email
        const userRes = await fetch(`http://localhost:5000/api/users/${email}`);
        const user = await userRes.json();
        const userId = user._id;

        // Fetch rides, excluding rides posted by this user
        const response = await fetch("http://localhost:5000/api/rides", {
          headers: {
            "user-id": userId, // ✅ sent to backend to filter out user's own rides
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🚗 Rides from backend (filtered):", data);

        setRides(data); // store in state
      } catch (err) {
        console.error("Error fetching rides:", err);
        setError("Could not load rides from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchDriverName = async (driverId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${driverId}`);
      if (!res.ok) throw new Error("Failed to fetch driver");
      const data = await res.json();
      return data.name || "Unknown";
    } catch (err) {
      console.error("Driver name fetch error:", err);
      return "Unknown";
    }
  };

  const fetchUserId = async () => {
    const email = localStorage.getItem("userEmail");
    const response = await fetch(`http://localhost:5000/api/users/${email}`);
    const user = await response.json();
    return user._id;
  };

  const createNotification = async (rideId, driverId) => {
    const passengerId = JSON.parse(localStorage.getItem("user"))?._id;
    if (!passengerId) return alert("User not logged in.");

    try {
      const response = await fetch("http://localhost:5000/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rideId,
          passengerId,
          driverId,
          status: "pending",
          type: "request",
        }),
      });

      if (response.status === 409) {
        alert("You already requested this ride.");
        setBookingInProgress(false);
        return;
      }

      const data = await response.json();
      console.log("✅ Notification created:", data);
    } catch (err) {
      console.error(" Notification creation failed:", err);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const displayedRides = filtered !== null ? filtered : rides;

  const handleFilter = (e) => {
    e.preventDefault();
    if (date && date < today) {
      setError("You cannot choose a past date.");
      return;
    }

    setError("");
    const result = rides.filter(
      (ride) =>
        (from === "" || ride.origin === from) &&
        (to === "" || ride.destination === to) &&
        (date === "" || ride.date.split("T")[0] === date)
    );
    setFiltered(result);
  };

  return (
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        <form onSubmit={handleFilter} style={filterBarStyle}>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={inputStyle}
          >
            <option value="">From</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={inputStyle}
          >
            <option value="">To</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={filterButtonStyle}>
            Filter
          </button>
        </form>

        {error && (
          <span style={{ color: "red", fontSize: "14px" }}>{error}</span>
        )}

        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ color: "#27445D", marginBottom: "5px" }}>
            Available cars for ride
          </h2>
          <p style={{ color: "#888", margin: 0 }}>
            {displayedRides?.length || 0} cars found
          </p>
        </div>

        {displayedRides.map((ride) => (
          <div
            key={ride._id}
            style={{
              ...rideCardStyle,
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "center",
              height: "100%",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-3px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={rideInfoStyle(isMobile)}>
              <img src="/bmw.png" alt="car" style={rideImageStyle} />
              <h3 style={vehicleNameStyle}>{ride.vehicleType}</h3>
            </div>

            <div
              style={{ marginTop: isMobile ? "10px" : "0", fontSize: "14px" }}
            >
              <p style={cardInfo}>
                From: {ride.origin} | To: {ride.destination}
              </p>
              <p style={cardInfo}>
                {ride.date.split("T")[0]} | {ride.time}
              </p>
              <p style={cardInfo}>
                {ride.preferredCommunity} | {ride.seatCapacity} seats
              </p>
            </div>

            <div style={priceButtonSectionStyle(isMobile)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMobile ? "flex-start" : "flex-end",
                }}
              >
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#27445D",
                    margin: 0,
                  }}
                >
                  SAR {ride.price}
                </h4>
                <button
                  style={bookButtonStyle}
                  onClick={async () => {
                    if (bookingInProgress) return;

                    setBookingInProgress(true);

                    const user = JSON.parse(localStorage.getItem("user"));
                    const email = localStorage.getItem("userEmail");

                    if (!email) {
                      alert("Session expired. Please log in again.");
                      return;
                    }

                    // ✅ Get user from DB using email
                    const userRes = await fetch(
                      `http://localhost:5000/api/users/${email}`
                    );
                    const userData = await userRes.json();
                    const passengerId = userData._id;

                    // Call backend to create the notification
                    const response = await fetch(
                      "http://localhost:5000/api/notifications",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          rideId: ride._id,
                          passengerId: passengerId,
                        }),
                      }
                    );

                    const data = await response.json();

                    if (response.status === 409) {
                      alert("You already requested this ride.");
                      setBookingInProgress(false);
                      return;
                    }

                    if (!response.ok) {
                      alert("Error sending request.");
                      console.error(data.message);
                      setBookingInProgress(false);
                      return;
                    }

                    // ✅ Fetch and attach driver's name before showing modal
                    const name = await fetchDriverName(ride.driver);
                    setSelectedRide({ ...ride, driverName: name });
                    setShowModal(true);
                  }}
                  disabled={bookingInProgress}
                >
                  Book Ride
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <img
              src="/checkmark.gif"
              alt="Success"
              style={{ width: "100px", marginBottom: "20px" }}
            />
            <h2 style={{ marginBottom: "20px" }}>Booking Request Sent</h2>
            <p style={{ fontSize: "16px" }}>
              Waiting for Driver to
              approve your ride request.
              <br />
              Ride ID: <code>{selectedRide?._id}</code>
            </p>
            <button
              style={okButtonStyle}
              onClick={() => {
                setShowModal(false);
                setBookingInProgress(false); // reset to allow booking again
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const cities = [
  "Riyadh",
  "Jeddah",
  "Dammam",
  "Makkah",
  "Madinah",
  "Abha",
  "Khobar",
  "Buraidah",
  "Tabuk",
  "Hail",
  "Najran",
];

const backgroundStyle = {
  background:
    "linear-gradient(to top, rgb(246, 244, 240) 60%, rgba(247, 241, 211, 0.71) 100%)",
  minHeight: "100vh",
  paddingTop: "80px",
  fontFamily: "Arial, sans-serif",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
};

const filterBarStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  marginBottom: "30px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
  fontFamily: "Arial, sans-serif",
  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
  flex: "1",
  minWidth: "180px",
};

const filterButtonStyle = {
  backgroundColor: "#27445D",
  color: "#fff",
  padding: "12px 24px",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
  transition: "opacity 0.2s ease",
};

const bookButtonStyle = {
  backgroundColor: "#27445D",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
  marginTop: "6px",
  marginLeft: "12px",
  transition: "background 0.3s ease",
};

const cardInfo = {
  color: "#000000",
  fontSize: "14px",
  margin: "4px 0",
  fontFamily: "Arial, sans-serif",
  letterSpacing: "0.3px",
};

const rideCardStyle = {
  display: "flex",
  gap: "16px",
  padding: "20px",
  borderRadius: "14px",
  backgroundColor: "#fff",
  border: "1px solid #D0ECEC",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  position: "relative",
  flexWrap: "wrap",
};

const rideInfoStyle = (isMobile) => ({
  display: "flex",
  alignItems: "center",
  gap: "14px",
  width: isMobile ? "100%" : "auto",
});

const rideImageStyle = {
  width: "100px",
  height: "auto",
  borderRadius: "10px",
  objectFit: "cover",
  flexShrink: 0,
};

const vehicleNameStyle = {
  color: "#27445D",
  margin: 0,
  fontSize: "18px",
  fontWeight: "bold",
  letterSpacing: "0.5px",
};

const priceButtonSectionStyle = (isMobile) => ({
  marginTop: isMobile ? "12px" : "0",
  width: isMobile ? "100%" : "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: isMobile ? "0" : "auto",
});

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "30px 40px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  maxWidth: "90%",
  width: "400px",
};

const okButtonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#27445D",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default BookRide;
