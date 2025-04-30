import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Driver.css';

function Driver() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        license: null,
        idCard: null,
        profileImage: null,
        vehicleReg: null
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.license) newErrors.license = "Driving license is required";
        if (!formData.idCard) newErrors.idCard = "National ID is required";
        if (!formData.profileImage) newErrors.profileImage = "Profile image is required";
        if (!formData.vehicleReg) newErrors.vehicleReg = "Vehicle registration is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate('/VerifyDriver');
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
                                <label htmlFor="idCard" className="driver-label">National ID</label>
                                <input id="idCard" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
                                {errors.idCard && <small className="text-danger">{errors.idCard}</small>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="driver-label">Vehicle Type</label>
                                <input id="phone" type="tel" className="driver-input" value={formData.phone} onChange={handleChange} />
                                {errors.phone && <small className="text-danger">{errors.phone}</small>}
                            </div>






                        </div>

                        <div className="driver-column">




                            <div>
                                <label htmlFor="license" className="driver-label">Driving License</label>
                                <input id="license" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
                                {errors.license && <small className="text-danger">{errors.license}</small>}
                            </div>

                            <div>
                                <label htmlFor="vehicleReg" className="driver-label">Vehicle Registration</label>
                                <input id="vehicleReg" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
                                {errors.vehicleReg && <small className="text-danger">{errors.vehicleReg}</small>}
                            </div>


                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <button type="submit" className="driver-submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Driver;