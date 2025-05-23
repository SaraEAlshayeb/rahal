import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Driver.css';
const API_URL = process.env.REACT_APP_API_URL;

function Driver() {
    const [formData, setFormData] = useState({
        drivingLicense: null,
        nationalId: null,
        vehicleRegistration: null,
        vehicleType: '',
    });

    const [errors, setErrors] = useState({});
    const [userName, setUserName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDriverModal, setShowDriverModal] = useState(false);
    const [showRejectedModal, setShowRejectedModal] = useState(false);


    const navigate = useNavigate();
    const email = localStorage.getItem("userEmail");


    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`${API_URL}/api/users/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const response1 = await fetch(`${API_URL}/api/rides/checkRole?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const data = response.data;
                const data1 = await response1.json();
                setUserName(data.name);

                if (data1.role === 'driver') {
                    setShowDriverModal(true);
                } else if (data.status === 'InProgress') {
                    setShowModal(true);
                } else if (data.status === 'Rejected') {
                    setShowRejectedModal(true);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        if (email) fetchUserInfo();
    }, [email]);


    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.drivingLicense) newErrors.drivingLicense = "Driving license is required";
        if (!formData.nationalId) newErrors.nationalId = "National ID is required";
        if (!formData.vehicleRegistration) newErrors.vehicleRegistration = "Vehicle registration is required";
        if (!formData.vehicleType) newErrors.vehicleType = "Vehicle type is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append("drivingLicense", formData.drivingLicense);
                formDataToSend.append("nationalId", formData.nationalId);
                formDataToSend.append("vehicleRegistration", formData.vehicleRegistration);
                formDataToSend.append("vehicleType", formData.vehicleType);
                formDataToSend.append("status", "InProgress");


                const token = localStorage.getItem("token");
                const response = await axios.put(
                    `${API_URL}/api/drivers/${email}`,
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );


                if (response.status === 200) {
                    setShowSuccessModal(true);
                } else {
                    alert("Error updating user data.");
                }
            } catch (error) {
                console.error("Error updating user:", error);
                alert("There was an error submitting your data. Please try again.");
            }
        }
    };



    return (
        <div className="container d-flex justify-content-center">
            <div className="driver-page-container">
                <div className="driver-form-wrapper w-100">
                    <h3 className="text-center mb-4">Driver Registration</h3>
                    <form onSubmit={handleSubmit} className="driver-form">
                        <div className="driver-column">
                            <div>
                                <label htmlFor="nationalId" className="driver-label">National ID</label>
                                <input id="nationalId" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
                                {errors.nationalId && <small className="text-danger">{errors.nationalId}</small>}
                            </div>
                            <div>
                                <label htmlFor="vehicleType" className="driver-label">Vehicle Type</label>
                                <input id="vehicleType" type="text" className="driver-input" value={formData.vehicleType} onChange={handleChange} />
                                {errors.vehicleType && <small className="text-danger">{errors.vehicleType}</small>}
                            </div>
                        </div>

                        <div className="driver-column">
                            <div>
                                <label htmlFor="drivingLicense" className="driver-label">Driving License</label>
                                <input id="drivingLicense" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
                                {errors.drivingLicense && <small className="text-danger">{errors.drivingLicense}</small>}
                            </div>
                            <div>
                                <label htmlFor="vehicleRegistration" className="driver-label">Vehicle Registration</label>
                                <input id="vehicleRegistration" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
                                {errors.vehicleRegistration && <small className="text-danger">{errors.vehicleRegistration}</small>}
                            </div>
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <button type="submit" className="driver-submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h4>Request In Progress</h4>
                        <p style={{ textAlign: 'center' }}>We are currently reviewing your request to become a driver. You’ll be notified when it's approved.</p>
                        <button onClick={() => navigate("/home")} className="driver-submit">OK</button>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="modal-backdrop">
                    <div className="modal-content text-center">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="/checkmark.gif" alt="Success" style={{ width: '90px', height: '90px', marginBottom: '20px' }} />
                        </div>
                        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Submitted Successfully</h2>
                        <p style={{ marginBottom: '20px' }}>
                            We are currently reviewing your request to become a driver.
                        </p>
                        <button
                            className="driver-submit"
                            onClick={() => {
                                setShowSuccessModal(false);
                                navigate("/home");
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}



            {showDriverModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>You're already part of our family!</h2>
                        <p>Welcome back, {userName}.</p>
                        <button className="driver-submit" onClick={() => navigate("/home")}>OK</button>
                    </div>
                </div>
            )}

            {showRejectedModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>Request Not Accepted</h2>
                        <p>Sorry, your request was not accepted. Please try again later.</p>
                        <button className="driver-submit" onClick={() => navigate("/home")}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Driver;
