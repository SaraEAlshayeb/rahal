import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const { rideId } = useParams();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleConfirm = async () => {
    try {
      // Only call the confirm endpoint — it handles both status and earnings
      await fetch(`http://localhost:5000/api/rides/${rideId}/confirm`, {
        method: "PUT",
      });

      setShowSuccess(true);
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/rides/${rideId}`
        );
        const data = await response.json();
        setRide(data);
      } catch (error) {
        console.error("Failed to load ride:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [rideId]);

  return (
    <div
      style={{
        backgroundColor: "#F4EDCD",
        minHeight: "100vh",
        paddingTop: "80px",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {!showSuccess ? (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #27445D",
            borderRadius: "12px",
            padding: "30px",
            maxWidth: "1100px",
            margin: "0 auto",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* Back Button + Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <button
              onClick={() => navigate("/book-ride")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginRight: "10px",
                padding: 0,
              }}
            >
              <img
                src="/back-arrow.png"
                alt="Back"
                style={{ width: "28px", height: "28px" }}
              />
            </button>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#27445D",
                margin: 0,
              }}
            >
              Checkout
            </h2>
          </div>

          {/* Ride Details */}
          <div style={{ marginBottom: "20px" }}>
            {ride && (
              <>
                <p>
                  <strong>From:</strong> {ride.origin}
                </p>
                <p>
                  <strong>To:</strong> {ride.destination}
                </p>
                <p style={{ color: "#333" }}>
                  Date: {ride.date?.split("T")[0]} | Time: {ride.time} |
                  Vehicle: {ride.vehicleType || "N/A"} | Seats:{" "}
                  {ride.seatCapacity}
                </p>
              </>
            )}
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ color: "#27445D" }}>Payment Method</h4>
            <div
              style={{
                backgroundColor: "#f7f7f7",
                padding: "15px 20px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/applepay.png"
                  alt="Apple Pay"
                  style={{ height: "38px", marginRight: "12px" }}
                />
                <span>Apple Pay</span>
              </div>
              <button
                onClick={() =>
                  alert("Sorry, no other payment methods available right now.")
                }
                style={{
                  background: "none",
                  border: "none",
                  color: "#27445D",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              >
                Change
              </button>
            </div>
          </div>

          {/* Total Amount Section */}
          <div style={{ marginTop: "40px" }}>
            <h4 style={{ color: "#27445D" }}>Total Amount</h4>
            {ride && (
              <>
                <p>
                  <strong>Sub-total:</strong> SAR {ride.price.toFixed(2)}
                </p>
                <p>
                  <strong>VAT (15%):</strong> SAR{" "}
                  {(ride.price * 0.15).toFixed(2)}
                </p>
                <hr style={{ margin: "20px 0" }} />
                <p>
                  <strong>Total Amount:</strong> SAR{" "}
                  {(ride.price * 1.15).toFixed(2)}
                </p>
              </>
            )}
          </div>

          {/* Confirm Button */}
          <div style={{ textAlign: "right", marginTop: "30px" }}>
            <button
              onClick={handleConfirm}
              style={{
                backgroundColor: "#27445D",
                color: "#fff",
                padding: "12px 24px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      ) : (
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
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "40px",
              width: "400px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ fontSize: "40px", color: "green" }}>✔</div>
            <h2 style={{ margin: "20px 0 10px" }}>Payment Success</h2>
            <p>Your ride has been successfully booked</p>
            <h4>Amount</h4>
            {ride && (
              <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                SAR {(ride.price * 1.15).toFixed(2)}
              </p>
            )}
            <button
              onClick={() => navigate("/history")}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                backgroundColor: "#27445D",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Track Ride
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
