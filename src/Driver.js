// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Driver.css';
// import {Button, Modal} from "react-bootstrap";

// function Driver() {
//     const [formData, setFormData] = useState({
//         drivingLicense: null,
//         nationalId: null,
//         vehicleRegistration: null,
//         vehicleType: '',
//     });

//     const [errors, setErrors] = useState({});
//     const [userStatus, setUserStatus] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [showSuccessModal, setShowSuccessModal] = useState(false);
//     const navigate = useNavigate();

//     const email = localStorage.getItem("userEmail");
//     console.log(email);

//     useEffect(() => {

//         const fetchUserStatus = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/users/${email}`);
//                 const status = response.data.status;
//                 setUserStatus(status);

//                 if (status === 'InProgress') {
//                     setShowModal(true);
//                 }
//             } catch (error) {
//                 console.error("Error fetching user status:", error);
//             }
//         };

//         if (email) {
//             fetchUserStatus();
//         }
//     }, [email]);

//     const handleChange = (e) => {
//         const { id, value, files } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [id]: files ? files[0] : value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newErrors = {};

//         if (!formData.drivingLicense) newErrors.drivingLicense = "Driving license is required";
//         if (!formData.nationalId) newErrors.nationalId = "National ID is required";
//         if (!formData.vehicleRegistration) newErrors.vehicleRegistration = "Vehicle registration is required";
//         if (!formData.vehicleType) newErrors.vehicleType = "Vehicle type is required";

//         setErrors(newErrors);

//         if (Object.keys(newErrors).length === 0) {
//             try {
//                 const formDataToSend = new FormData();
//                 formDataToSend.append("drivingLicense", formData.drivingLicense);
//                 formDataToSend.append("nationalId", formData.nationalId);
//                 formDataToSend.append("vehicleRegistration", formData.vehicleRegistration);
//                 formDataToSend.append("vehicleType", formData.vehicleType);
//                 formDataToSend.append("status", "InProgress");

//                 const response = await axios.put(`http://localhost:5000/api/drivers/${email}`, formDataToSend, {
//                     headers: {
//                         "Content-Type": "multipart/form-data"
//                     }
//                 });

//                 if (response.status === 200) {
//                     setShowSuccessModal(true);
//                 } else {
//                     alert("Error updating user data.");
//                 }
//             } catch (error) {
//                 console.error("Error updating user:", error);
//                 alert("There was an error submitting your data. Please try again.");
//             }
//         }
//     };

//     const modalOverlayStyle = {
//         position: 'fixed',
//         top: 0, left: 0, right: 0, bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1000
//     };

//     const modalContentStyle = {
//         backgroundColor: '#fff',
//         padding: '30px',
//         borderRadius: '12px',
//         textAlign: 'center',
//         maxWidth: '400px',
//         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
//     };

//     return (
//         <div className="container d-flex justify-content-center">
//             <div className="driver-page-container">
//                 <div className="driver-form-wrapper w-100">
//                     <h3 className="text-center mb-4">Driver Registration</h3>
//                     <form onSubmit={handleSubmit} className="driver-form">
//                         <div className="driver-column">
//                             <div>
//                                 <label htmlFor="nationalId" className="driver-label">National ID</label>
//                                 <input id="nationalId" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
//                                 {errors.nationalId && <small className="text-danger">{errors.nationalId}</small>}
//                             </div>
//                             <div>
//                                 <label htmlFor="vehicleType" className="driver-label">Vehicle Type</label>
//                                 <input id="vehicleType" type="text" className="driver-input" value={formData.vehicleType} onChange={handleChange} />
//                                 {errors.vehicleType && <small className="text-danger">{errors.vehicleType}</small>}
//                             </div>
//                         </div>

//                         <div className="driver-column">
//                             <div>
//                                 <label htmlFor="drivingLicense" className="driver-label">Driving License</label>
//                                 <input id="drivingLicense" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
//                                 {errors.drivingLicense && <small className="text-danger">{errors.drivingLicense}</small>}
//                             </div>
//                             <div>
//                                 <label htmlFor="vehicleRegistration" className="driver-label">Vehicle Registration</label>
//                                 <input id="vehicleRegistration" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
//                                 {errors.vehicleRegistration && <small className="text-danger">{errors.vehicleRegistration}</small>}
//                             </div>
//                         </div>

//                         <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
//                             <button type="submit" className="driver-submit">Submit</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {showModal && (
//                 <div className="modal-backdrop">
//                     <div className="modal-content">
//                         <h4>Request In Progress</h4>
//                         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
//                             <p style={{ textAlign: 'center' }}>
//                                 We are currently reviewing your request to become a driver. You’ll be notified when it's approved.
//                             </p>
//                             <button onClick={() => navigate("/home")} className="driver-submit" style={{ minWidth: '100px', marginTop: '20px' }}>
//                                 OK
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showSuccessModal && (
//                 <div style={modalOverlayStyle}>
//                     <div style={modalContentStyle}>
//                         <img src="/checkmark.gif" alt="Success" style={{ width: '100px', marginBottom: '20px' }} />
//                         <h2 style={{ marginBottom: '20px' }}>Submitted Successfully</h2>
//                         <p style={{ fontSize: '16px' }}>We are currently reviewing your request to become a driver.</p>
//                         <button className="driver-submit" onClick={() => { setShowSuccessModal(false); navigate("/home"); }}>
//                             OK
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Driver;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Driver.css';
import { Button, Modal } from 'react-bootstrap';

function Driver() {
    const [formData, setFormData] = useState({
        drivingLicense: null,
        nationalId: null,
        vehicleRegistration: null,
        vehicleType: '',
    });

    const [errors, setErrors] = useState({});
    const [userStatus, setUserStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const [hasSubmitted, setHasSubmitted] = useState(
        localStorage.getItem('hasSubmitted') === 'true'
      );
      

    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${email}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });                const user = response.data;

                setUserStatus(user.status);

                const hasFilledInfo =
                    user.vehicleType &&
                    user.drivingLicense?.filename &&
                    user.vehicleRegistration?.filename &&
                    user.nationalId?.filename;

                if (user.status === "InProgress" && hasFilledInfo) {
                    setShowModal(true);
                }

            } catch (error) {
                console.error("Error fetching user status:", error);
            }
        };

        if (email) {
            fetchUserStatus();
        }
    }, [email]);



    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
      
        if (!formData.drivingLicense) newErrors.drivingLicense = 'Driving license is required';
        if (!formData.nationalId) newErrors.nationalId = 'National ID is required';
        if (!formData.vehicleRegistration) newErrors.vehicleRegistration = 'Vehicle registration is required';
        if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
      
        setErrors(newErrors);
      
        if (Object.keys(newErrors).length === 0) {
          try {
            const response = await axios.put(
              `http://localhost:5000/api/drivers/${email}`,
              {
                drivingLicense: formData.drivingLicense,
                nationalId: formData.nationalId,
                vehicleRegistration: formData.vehicleRegistration,
                vehicleType: formData.vehicleType,
                status: 'InProgress',
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
      
            if (response.status === 200) {
                setHasSubmitted(true);
                localStorage.setItem('hasSubmitted', 'true');
                setShowSuccessModal(true);
              }
               else {
              alert('Error updating user data.');
            }
          } catch (error) {
            console.error('Error updating user:', error);
            alert('There was an error submitting your data. Please try again.');
          }
        }
      };
      
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const modalContentStyle = {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        textAlign: 'center',
        maxWidth: '400px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
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
                                <input
                                    id="nationalId"
                                    type="text"
                                    className="driver-input"
                                    value={formData.nationalId}
                                    onChange={handleChange}
                                    disabled={hasSubmitted}
                                />
                                {errors.nationalId && <small className="text-danger">{errors.nationalId}</small>}
                            </div>

                            <div>
                                <label htmlFor="vehicleType" className="driver-label">Vehicle Type</label>
                                <input
                                    id="vehicleType"
                                    type="text"
                                    className="driver-input"
                                    value={formData.vehicleType}
                                    onChange={handleChange}
                                    disabled={hasSubmitted}
                                />
                                {errors.vehicleType && <small className="text-danger">{errors.vehicleType}</small>}
                            </div>
                        </div>

                        <div className="driver-column">
                            <div>
                                <label htmlFor="drivingLicense" className="driver-label">Driving License</label>
                                <input
                                    id="drivingLicense"
                                    type="text"
                                    className="driver-input"
                                    value={formData.drivingLicense}
                                    onChange={handleChange}
                                    disabled={hasSubmitted}
                                />
                                {errors.drivingLicense && <small className="text-danger">{errors.drivingLicense}</small>}
                            </div>

                            <div>
                                <label htmlFor="vehicleRegistration" className="driver-label">Vehicle Registration</label>
                                <input
                                    id="vehicleRegistration"
                                    type="text"
                                    className="driver-input"
                                    value={formData.vehicleRegistration}
                                    onChange={handleChange}
                                    disabled={hasSubmitted}
                                />
                                {errors.vehicleRegistration && <small className="text-danger">{errors.vehicleRegistration}</small>}
                            </div>
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <button type="submit" className="driver-submit" disabled={hasSubmitted}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h4>Request In Progress</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                            <p style={{ textAlign: 'center' }}>
                                We are currently reviewing your request to become a driver. You’ll be notified when it's approved.
                            </p>
                            <button onClick={() => navigate("/home")} className="driver-submit" style={{ minWidth: '100px', marginTop: '20px' }}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <img src="/checkmark.gif" alt="Success" style={{ width: '100px', marginBottom: '20px' }} />
                        <h2 style={{ marginBottom: '20px' }}>Submitted Successfully</h2>
                        <p style={{ fontSize: '16px' }}>We are currently reviewing your request to become a driver.</p>
                        <button className="driver-submit" onClick={() => { setShowSuccessModal(false); navigate("/home"); }}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Driver;
