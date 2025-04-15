import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function ApproveDrivers() {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            issuedBy: "Lamyaa Alyousef",
            requestNumber: "#RN1925",

        },
        {
            id: 2,
            issuedBy: "Sara Alshayeb",
            drequestNumber: "#RN2025",

        },
        {
            id: 3,
            issuedBy: "Rimas Alghamdi",
            requestNumber: "#RN2125",

        },
        {
            id: 4,
            issuedBy: "Farah Almutairi",
            requestNumber: "#RN2225",

        },
        {
            id: 5,
            issuedBy: "Sarah Alshalali",
            requestNumber: "#RN2325",

        },
        {
            id: 6,
            issuedBy: "Mohammad Ali",
            requestNumber: "#RN2425",

        },
        {
            id: 7,
            issuedBy: "Fawaz Aref",
            requestNumber: "#RN2525",

        },
    ]);

    const handleDismiss = (id) => {
        setComplaints((prev) => prev.filter((complaint) => complaint.id !== id));
    };

    return (
        <div>
            <div className="admin-toolbar">
                <img src="/Rahal_Logo.png" alt="Logo" className="toolbar-logo" />
                <span className="logout-text">Logout</span>
            </div>

            <div className="search-filter-bar">
                <div className="search-group">
                    <label htmlFor="search">Search</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search complaints..."
                        className="search-input"
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="filter">Filter</label>
                    <select id="filter" className="filter-dropdown">
                        <option value="">All</option>
                        <option value="latest">Latest</option>
                        <option value="name">Name A-Z</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>



            <div className="page-center">
                {complaints.map((complaint) => (
                    <div className="item-box" key={complaint.id}>
                        <div className="item-content">
                            <div className="item-info">
                                <p>
                                    <strong>{complaint.issuedBy}</strong>
                                    <span style={{ fontWeight: "normal" }}> has requested to be a driver!</span>
                                </p>

                            </div>
                        </div>

                        <div className="item-buttons">
                            <button className="btn btn-outline" onClick={() => handleDismiss(complaint.id)}>
                                Dismiss
                            </button>
                            <button className="btn btn-filled" onClick={() => handleDismiss(complaint.id)}>
                                Approve
                            </button>
                            <button className="btn btn-filled" onClick={() => navigate('/review-driver')}>
                                Review
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApproveDrivers;
