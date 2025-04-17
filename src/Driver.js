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
        <div className="body">
            <div className="driver-form-wrapper">
                <form onSubmit={handleSubmit} className="driver-form">
                    <div className="driver-column">
                        <label htmlFor="fullName" className="driver-label">Full Name</label>
                        <input id="fullName" type="text" placeholder="Enter your full name" className="driver-input" value={formData.fullName} onChange={handleChange} />
                        {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}

                        <label htmlFor="email" className="driver-label">Email</label>
                        <input id="email" type="email" placeholder="Enter your email" className="driver-input" value={formData.email} onChange={handleChange} />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

                        <label htmlFor="phone" className="driver-label">Phone Number</label>
                        <input id="phone" type="tel" placeholder="Enter your phone number" className="driver-input" value={formData.phone} onChange={handleChange} />
                        {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}

                        <label htmlFor="gender" className="driver-label">Gender</label>
                        <select id="gender" className="driver-select" value={formData.gender} onChange={handleChange}>
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
                    </div>

                    <div className="driver-column">
                        <label htmlFor="idCard" className="driver-label">National ID</label>
                        <label className="custom-file-label">
                            <input id="idCard" className="driver-input" type="file" accept="image/*" onChange={handleChange} />
                        </label>
                        {errors.idCard && <span style={{ color: 'red' }}>{errors.idCard}</span>}

                        <label htmlFor="profileImage" className="driver-label">Profile Image</label>
                        <label className="custom-file-label">
                            <input id="profileImage" className="driver-input" type="file" accept="image/*" onChange={handleChange} />
                        </label>
                        {errors.profileImage && <span style={{ color: 'red' }}>{errors.profileImage}</span>}

                        <label htmlFor="license" className="driver-label">Driving License</label>
                        <label className="custom-file-label">
                            <input id="license" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
                        </label>
                        {errors.license && <span style={{ color: 'red' }}>{errors.license}</span>}

                        <label htmlFor="vehicleReg" className="driver-label">Vehicle Registration</label>
                        <label className="custom-file-label">
                            <input id="vehicleReg" type="file" className="driver-input" accept="image/*" onChange={handleChange} />
                        </label>
                        {errors.vehicleReg && <span style={{ color: 'red' }}>{errors.vehicleReg}</span>}

                    </div>

                </form>
                <input type="submit" className="driver-submit" />

            </div>
        </div>
    );
}

export default Driver;
