import React, { useEffect, useState } from 'react';
import './Post.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Navbar from './components/Navbar';
import axios from "axios";

const saudiCities = [
    'Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah',
    'Abha', 'Khobar', 'Buraidah', 'Tabuk', 'Hail', 'Najran'
];

function PostRide() {
    const [communityNames, setCommunityNames] = useState([]);
    const [selectedCommunity, setSelectedCommunity] = useState('');

    const [rideData, setRideData] = useState({
        from: '',
        to: '',
        date: '',
        time: '',
        vehicleType: '',
        seatCapacity: 0,
        price: 0,
        preferredCommunity: '',
    },[]);

    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                console.log(email)

                const response = await fetch(`http://localhost:5000/api/rides/checkRole?email=${email}`);
                const data = await response.json();
                console.log(data.role);

                if (data.role !== 'driver') {
                    setShowDialog(true)
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };
        const fetchCommunities = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/community");
                const data = await response.json();

                // Assuming the response is an array of community objects,
                // extract the names into a new array
                const names = data.map(community => community.name);  // Adjust if the structure is different

                setCommunityNames(names);
            } catch (error) {
                console.error('Error fetching community data:', error);
            }
        };



        fetchUserRole();
        fetchCommunities();

    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setRideData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? Number(value) : value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem('userEmail');
        const response = await axios.get(`http://localhost:5000/api/users/${email}`);
        const id= response.data._id

        // Include email in the payload
        const newRideData = {
            ...rideData,
            driver: id
        };

        try {
            const response = await fetch('http://localhost:5000/api/rides/postRide', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRideData),

            });
            console.log(response)

            if (response.ok) {
                console.log('Ride posted successfully');
                navigate('/Verified');
            } else {
                const errorData = await response.json();

                console.error('Failed to post ride:', errorData.message);
                alert(`Failed to post ride: ${errorData.message}`);
            }
        } catch (error) {

            console.error('Error posting ride:', error);
            alert('An error occurred while posting the ride.');
        }
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
                            <label htmlFor="communitySelect" className="form-label">Preferred Community:</label>
                            <select
                                id="communitySelect"
                                name="preferredCommunity"
                                value={rideData.preferredCommunity}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="">Select</option>
                                {communityNames.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>




                        </div>
                    </div>

                    <button onClick={handleSubmit} className="submit-button">Post Ride</button>
                </div>
            </div>

            <Modal
                show={showDialog}
                onHide={() => setShowDialog(false)}
                backdrop="static"    // Prevent closing by clicking outside
                keyboard={false}     // Prevent closing by pressing ESC key
            >
                <Modal.Header closeButton={false}>  {/* Disable the close button */}
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
