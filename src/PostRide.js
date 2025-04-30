import React, { useEffect, useState } from 'react';
import './Post.css';
import Verified from './Verified.js';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 

const saudiCities = [
    'Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah',
    'Abha', 'Khobar', 'Buraidah', 'Tabuk', 'Hail', 'Najran'
  ];

function PostRide(){
    /*const [communityOptions, setCommunityOptions] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/communities/options')
            .then(res => res.json())
            .then(data => setCommunityOptions(data))
            .catch(err => console.error("Failed to load communities", err));
    }, []);*/

    const [rideData, setRideData] = useState({
        from: '',
        to: '',
        date: '',
        time: '',
        vehicleType: '',
        seatCapacity: '',
        price: '',
        preferredCommunity: '',
        notes: '',
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

                <h2>Vehicle Details</h2>
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

                <h2>Ride Preferences</h2>
                <div className="form-container">
                    <div className="vehicle-grid">
                        <label className="form-label">Price (SAR) :</label>
                        <input
                            type="text"
                            name="price"
                            value={rideData.vehicleType}
                            onChange={handleChange}
                            placeholder="e.g. 50 "
                            className="form-input"
                        />

                        <label className="form-label">Preferred Communities: </label>
                        <select
                            name="preferredCommunity"
                            value={rideData.preferredCommunity || ''}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="">Select</option>
                            // here goes the backend data
                        </select>

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
