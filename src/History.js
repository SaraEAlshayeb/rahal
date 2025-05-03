import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaArrowUp, FaFilter } from "react-icons/fa";

const History = () => {
  const [filter, setFilter] = useState("all");
  const [mode, setMode] = useState("driver");
  const [selectedRide, setSelectedRide] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverCard, setHoverCard] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [rideCompleted, setRideCompleted] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    community: "",
    from: "",
    to: "",
  });
  const [rides, setRides] = useState([]);

  const [userId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      const endpoint =
        mode === "driver"
          ? `http://localhost:5000/api/history/driver/${userId}`
          : `http://localhost:5000/api/history/rider/${userId}`;
      const res = await axios.get(endpoint);
      setRides(res.data);
    };

    fetchHistory();
  }, [mode, userId]); // now this is safe

  const sortedRides = [...rides]
    .filter((ride) =>
      mode === "driver"
        ? ride.driver?.toString() === userId || ride.driver === userId
        : ride.acceptedRiders?.some(
            (id) => id.toString() === userId || id === userId
          )
    )

    .sort((a, b) => {
      if (a.status === "In Progress" && b.status !== "In Progress") return -1;
      if (a.status !== "In Progress" && b.status === "In Progress") return 1;
      return 0;
    });

  const filteredRides = sortedRides.filter(
    (ride) =>
      (filter === "all" || ride.status === filter) &&
      (!activeFilters.community ||
        ride.preferredCommunity === activeFilters.community) &&
      (!activeFilters.from || ride.origin === activeFilters.from) &&
      (!activeFilters.to || ride.destination === activeFilters.to)
  );

  const toggleFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  const totalEarnings = rides
    .filter((r) => r.driver === userId && r.status === "completed")
    .reduce((sum, r) => sum + (r.price || 0), 0);

  const avgRating = (
    rides
      .filter((r) => r.driverId === userId && r.ratingGiven)
      .reduce((sum, r) => sum + (r.ratingGiven || 0), 0) /
      rides.filter((r) => r.driverId === userId && r.ratingGiven).length || 1
  ).toFixed(1);

  const handleSubmit = async () => {
    const issuedBy = localStorage.getItem("userId");
    const driverId = selectedRide.driver?._id || selectedRide.driver;
    const rideId = selectedRide._id?.toString?.() || selectedRide._id;

    if (!issuedBy || !driverId || !rideId || !comment) {
      alert("Missing data for complaint");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/history/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issuedBy: issuedBy.toString(),
          driverId: driverId.toString(),
          rideId: rideId.toString(),
          description: comment,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Complaint submitted successfully!");
        setComment("");
        setSelectedRide(null);
      } else {
        console.error("Backend error:", data);
        alert("Error submitting complaint: " + data.error);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error submitting complaint.");
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewClick = async (ride) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${ride.driver}`);
      const data = await res.json();

      setSelectedRide({
        ...ride,
        driverName: data.name || "Unknown Driver",
      });
    } catch (error) {
      console.error("Failed to fetch driver name:", error);
      setSelectedRide({
        ...ride,
        driverName: "Unknown Driver",
      });
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to top, rgb(246, 244, 240) 60%, rgba(247, 241, 211, 0.71) 100%)",
        minHeight: "100vh",
        padding: "100px 20px",
        fontFamily: "Segoe UI",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "36px",
            color: "#27445D",
            fontWeight: "bold",
            background: "linear-gradient(to right, #27445D, #6e8b9e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1.2px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Rides History
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            style={{ padding: "10px 20px", borderRadius: "10px" }}
          >
            <option value="rider">Rider Mode</option>
            <option value="driver">Driver Mode</option>
          </select>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "10px 20px", borderRadius: "10px" }}
          >
            <option value="all">All</option>
            <option value="In Progress">Upcoming</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              backgroundColor: "#27445D",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              boxShadow: "0 4px 8px rgba(39, 68, 93, 0.2)",
              transition: "all 0.3s ease",
            }}
          >
            <FaFilter /> Filters
          </button>
        </div>

        {showFilters && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 0 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                Ã—
              </button>
            </div>

            <strong>Communities:</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                margin: "10px 0",
              }}
            >
              {["KFUPM", "PNU", "KSAU", "KFU", "PMU", "IAU"].map((c) => (
                <button
                  key={c}
                  onClick={() => toggleFilter("community", c)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "16px",
                    border: "1px solid #27445D",
                    backgroundColor:
                      activeFilters.community === c ? "#27445D" : "white",
                    color: activeFilters.community === c ? "white" : "#27445D",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            <strong>From:</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                margin: "10px 0",
              }}
            >
              {[
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
              ].map((c) => (
                <button
                  key={c}
                  onClick={() => toggleFilter("from", c)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "16px",
                    border: "1px solid #27445D",
                    backgroundColor:
                      activeFilters.from === c ? "#27445D" : "white",
                    color: activeFilters.from === c ? "white" : "#27445D",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            <strong>To:</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                margin: "10px 0",
              }}
            >
              {[
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
              ].map((c) => (
                <button
                  key={c}
                  onClick={() => toggleFilter("to", c)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "16px",
                    border: "1px solid #27445D",
                    backgroundColor:
                      activeFilters.to === c ? "#27445D" : "white",
                    color: activeFilters.to === c ? "white" : "#27445D",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard Section */}
        {mode === "driver" && (
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "16px 24px",
                borderRadius: "16px",
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              }}
            >
              <FaArrowUp color="green" size={20} />{" "}
              <strong>Total Earnings:</strong> SAR {totalEarnings || 0}
            </div>
            <div
              style={{
                background: "#fff",
                padding: "16px 24px",
                borderRadius: "16px",
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              }}
            >
              <FaArrowUp color="green" size={20} />{" "}
              <strong>Total Rides:</strong>{" "}
              {rides.filter((r) => r.driver?.toString() === userId).length}
            </div>
            <div
              style={{
                background: "#fff",
                padding: "16px 24px",
                borderRadius: "16px",
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              }}
            >
              <FaStar color="gold" size={20} /> <strong>Avg Rating:</strong>{" "}
              {avgRating}
            </div>
          </div>
        )}

        {/* Rides List */}
        <div style={{ marginTop: "30px" }}>
          {filteredRides.map((ride) => (
            <div
              key={ride._id}
              onMouseEnter={() => setHoverCard(ride._id)}
              onMouseLeave={() => setHoverCard(null)}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "20px",
                marginBottom: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transform: hoverCard === ride._id ? "scale(1.02)" : "scale(1)",
                transition: "transform 0.3s ease",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    color: ride.status === "In Progress" ? "orange" : "green",
                  }}
                >
                  {ride.status.toUpperCase()}
                </div>
                {ride.status === "completed" &&
                  (ride.rating || ride.ratingGiven) && (
                    <div style={{ display: "flex", gap: "4px" }}>
                      {[...Array(ride.rating || ride.ratingGiven)].map(
                        (_, i) => (
                          <FaStar key={i} color="gold" />
                        )
                      )}
                    </div>
                  )}
              </div>

              <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                {mode === "driver" ? ride.passengerName : ride.vehicleType}
              </p>

              <p>
                <strong>From:</strong> {ride.origin} | <strong>To:</strong>{" "}
                {ride.destination}
              </p>
              <p>
                {new Date(ride.date).toLocaleDateString()} | {ride.time}
              </p>

              {ride.price && mode === "driver" && (
                <p>
                  <strong>Earning:</strong> SAR {ride.price}
                </p>
              )}

              {mode === "rider" && (
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                  <button
                    onClick={() => handleViewClick(ride)}
                    style={{
                      backgroundColor: "#27445D",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                </div>
              )}

              {ride.status === "completed" && (
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                  <button
                    onClick={() =>
                      setSelectedRide({ ...ride, isComplaint: true })
                    }
                    style={{
                      backgroundColor: "#27445D",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Raise a Complaint
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedRide && !selectedRide?.isComplaint && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "30px",
                width: "90%",
                maxWidth: "500px",
                position: "relative",
                boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <button
                onClick={() => setSelectedRide(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                }}
              >
                Ã—
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={
                    mode === "rider" ? selectedRide.image : "/Rahal_Logo.png"
                  }
                  alt="car"
                  style={{
                    width: "100px",
                    marginRight: "15px",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <h3>
                    {mode === "rider"
                      ? selectedRide.vehicle
                      : selectedRide.passenger}
                  </h3>
                  <p style={{ color: "gray" }}>â­ 4.9 (531 reviews)</p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#F3F3F3",
                  padding: "15px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold", margin: 0 }}>
                    {mode === "rider"
                      ? "Contact Your Driver"
                      : "Contact Your Passenger"}
                  </p>
                  <p style={{ margin: 0 }}>
                    {mode === "rider"
                      ? selectedRide.driverName
                      : selectedRide.passenger}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div
                    onClick={() => alert("You will be redirected to WhatsApp")}
                    style={{ width: "28px", height: "28px", cursor: "pointer" }}
                  >
                    <img
                      src="/social.png"
                      alt="whatsapp"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div
                    onClick={() =>
                      alert("You will be redirected to the phone dialer")
                    }
                    style={{ width: "28px", height: "28px", cursor: "pointer" }}
                  >
                    <img src="/call.png" alt="call" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
              {!rideCompleted ? (
                <button
                  onClick={() => setRideCompleted(true)}
                  style={{
                    backgroundColor: "#27445D",
                    color: "white",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                >
                  Ride completed? Ready to leave feedback?
                </button>
              ) : (
                <>
                  <p style={{ fontWeight: "bold", marginTop: "20px" }}>
                    How was your ride?
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {[...Array(5)].map((_, i) => {
                      const value = i + 1;
                      return (
                        <FaStar
                          key={i}
                          color={
                            value <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                          }
                          size={24}
                          onMouseEnter={() => setHover(value)}
                          onMouseLeave={() => setHover(0)}
                          onClick={() => setRating(value)}
                          style={{ cursor: "pointer" }}
                        />
                      );
                    })}
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      marginBottom: "16px",
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "#27445D",
                      color: "white",
                      border: "none",
                      padding: "10px 24px",
                      borderRadius: "8px",
                    }}
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {selectedRide?.isComplaint && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "30px",
                width: "90%",
                maxWidth: "500px",
                position: "relative",
              }}
            >
              <button
                onClick={() => setSelectedRide(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                }}
              >
                Ã—
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              ></div>
              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#27445D",
                }}
              >
                We value your experience and are here to listen to your
                complaint
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your complaint here..."
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginBottom: "16px",
                  minHeight: "100px",
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#27445D",
                  color: "white",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "8px",
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
