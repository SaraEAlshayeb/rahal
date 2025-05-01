import React, { useEffect, useState } from 'react';
import './Post.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Navbar from './components/Navbar';

const saudiCities = [
    'Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah',
    'Abha', 'Khobar', 'Buraidah', 'Tabuk', 'Hail', 'Najran'
];

function PostRide() {
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

    const [showDialog, setShowDialog] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [communityOptions, setCommunityOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                if (!email) {
                    alert('No user email found, please login first');
                    navigate('/login');
                    return;
                }

                const response = await fetch(`http://localhost:5000/api/getUserRole/checkRole?email=${email}`);
                const data = await response.json();

                if (data.role === 'driver') {
                    setUserRole('driver');
                } else {
                    setUserRole('non-driver');
                    setShowDialog(true);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        const fetchCommunities = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/communities/options');
                const data = await res.json();
                setCommunityOptions(data);
            } catch (err) {
                console.error('Failed to load communities', err);
            }
        };

        fetchUserRole();
        fetchCommunities();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRideData({ ...rideData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();



        navigate('/Verified');
    };

    const handleGoToDriverPage = () => {
        navigate('/driver');
    };

    const handleReturnHome = () => {
        navigate('/home');
    };

    return (
        <>
            <div className="page-container">
                <div className="form-wrapper">
                    <h1>Post Ride</h1>

                    {/* Ride Details Section */}
                    <h2>Ride Details</h2>
                    <div className="form-container">
                        <div className="form-grid">
                            <label className="form-label">From:</label>
                            <select name="from" value={rideData.from} onChange={handleChange} className="form-input">
                                <option value="">Select</option>
                                {saudiCities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>

                            <label className="form-label">To:</label>
                            <select name="to" value={rideData.to} onChange={handleChange} className="form-input">
                                <option value="">Select</option>
                                {saudiCities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>

                            <label className="form-label">Date:</label>
                            <input type="date" name="date" value={rideData.date} onChange={handleChange} className="form-input" />

                            <label className="form-label">Departure Time:</label>
                            <input type="time" name="time" value={rideData.time} onChange={handleChange} className="form-input" />
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

                            <label className="form-label">Seat Capacity:</label>
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
                            <label className="form-label">Price (SAR):</label>
                            <input
                                type="text"
                                name="price"
                                value={rideData.price}
                                onChange={handleChange}
                                placeholder="e.g. 50"
                                className="form-input"
                            />

                            <label className="form-label">Preferred Community:</label>
                            <select
                                name="preferredCommunity"
                                value={rideData.preferredCommunity}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="">Select</option>
                                {communityOptions.map((community, index) => (
                                    <option key={index} value={community}>{community}</option>
                                ))}
                            </select>

                            <label className="form-label">Notes:</label>
                            <textarea
                                name="notes"
                                value={rideData.notes}
                                onChange={handleChange}
                                placeholder="Any extra info"
                                className="form-input"
                                rows="2"
                            />
                        </div>
                    </div>

                    <button onClick={handleSubmit} className="submit-button">Post Ride</button>
                </div>
            </div>

            {/* Modal Dialog for non-driver users */}
            <Modal show={showDialog} onHide={() => setShowDialog(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Not a Verified Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to be a verified driver to post a ride. Would you like to apply as a driver or return home?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="custom-button"
                        onClick={handleReturnHome}
                    >
                        Return to Home
                    </Button>
                    <Button
                        className="custom-button"
                        onClick={handleGoToDriverPage}
                    >
                        Apply as Driver
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PostRide;
