import React, { useState } from 'react';
import './Post.css';
import Verified from './Verified.js';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 

const saudiCities = [
    "Riyadh", "Jeddah", "Dammam", "Khobar", "Mecca", "Medina",
    "Tabuk", "Abha", "Al Ahsa", "Hail", "Buraidah", "Najran", "Al Baha", "Jazan", "Sakaka"
];

function PostRide(){
    const [rideData, setRideData] = useState({
        from: '',
        to: '',
        date: '',
        time: '',
        vehicleType: '',
        seatCapacity: '',
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRideData({ ...rideData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = localStorage.getItem("userEmail");
        const verifiedDriverEmail = "sara@hotmail.com";

        if (email !== verifiedDriverEmail) {
            localStorage.clear();
            alert("You must be a verified driver to post a ride.");
            navigate('/driver'); // redirect to Apply as Driver page
            return;
        }

        navigate('/Verified'); // proceed to post if verified
    };

    return(
        <>
        <Navbar />
        <div className="page-container">
            <div className="form-wrapper">
                <h1>Post Ride</h1>

                {/* Ride Details Section */}
                <h2>Ride Details</h2>
                <div className="form-container">
                    <div className="form-grid">
                        <label className="form-label">From:</label>
                        <select
                            name="from"
                            value={rideData.from}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="">Select</option>
                            {saudiCities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>

                        <label className="form-label">To:</label>
                        <select
                            name="to"
                            value={rideData.to}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="">Select</option>
                            {saudiCities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>

                        <label className="form-label">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={rideData.date}
                            onChange={handleChange}
                            className="form-input"
                        />

                        <label className="form-label">Departure Time:</label>
                        <input
                            type="time"
                            name="time"
                            value={rideData.time}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </div>
                <div className="form-container">
                    <div className="vehicle-grid">
                        <label className="form-label">Vehicle Type:</label>
                        <input
                            type="text"
                            name="vehicleType"
                            value={rideData.vehicleType}
                            onChange={handleChange}
                            placeholder="e.g. Sedan"
                            className="form-input"
                        />

                        <label className="form-label">Vehicle's seat capacity:</label>
                        <input
                            type="number"
                            name="seatCapacity"
                            value={rideData.seatCapacity}
                            onChange={handleChange}
                            placeholder="e.g. 4"
                            className="form-input"
                            min="1"
                        />

                    </div>
                </div>
                
                <button
                    onClick={handleSubmit}
                className="submit-button"
                >
                    Post Ride
                </button>
               
            </div>
        </div>
        </>
        
    )

}
export default PostRide;