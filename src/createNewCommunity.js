import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Driver.css';
function createNewCommunity() {
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
            navigate('/verify-driver');
        }
    };


    return (
        <div style={containerStyle} >
            <div className="driver-form-wrapper">
                <form onSubmit={handleSubmit} className="driver-form" >
                    <div className="driver-column">
                        <label htmlFor="fullName" className="driver-label">Full Name</label>
                        <input id="fullName" type="text" placeholder="Enter your full name" className="driver-input" value={formData.fullName} onChange={handleChange} />
                        {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}

                        <label htmlFor="email" className="driver-label">Email</label>
                        <input id="email" type="email" placeholder="Enter your email" className="driver-input"  value={formData.email} onChange={handleChange} />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

                        <label htmlFor="phone" className="driver-label">Phone Number</label>
                        <input id="phone" type="tel" placeholder="Enter your phone number" className="driver-input"  value={formData.phone} onChange={handleChange} />
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
                        <label htmlFor="license" className="driver-label">Driving License</label>
                        <input id="license" type="file" accept="image/*" className="driver-input" onChange={handleChange} />
                        {errors.license && <span style={{ color: 'red' }}>{errors.license}</span>}

                        <label htmlFor="idCard" className="driver-label">National ID</label>
                        <input id="idCard" type="file" accept="image/*" className="driver-input" onChange={handleChange} />
                        {errors.idCard && <span style={{ color: 'red' }}>{errors.idCard}</span>}

                        <label htmlFor="profileImage" className="driver-label">Profile Image</label>
                        <input id="profileImage" type="file" accept="image/*" className="driver-input" onChange={handleChange} />
                        {errors.profileImage && <span style={{ color: 'red' }}>{errors.profileImage}</span>}

                        <label htmlFor="vehicleReg" className="driver-label">Vehicle Registration</label>
                        <input id="vehicleReg" type="file" accept="image/*" className="driver-input"onChange={handleChange} />
                        {errors.vehicleReg && <span style={{ color: 'red' }}>{errors.vehicleReg}</span>}
                    </div>

                    <input type="submit" className="driver-submit" />
                </form>
            </div>
        </div>
    );

}
const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "120vh",
    backgroundImage: "url('/PageBackground.png')",
    backgroundSize: "cover",
};
export default createNewCommunity;
