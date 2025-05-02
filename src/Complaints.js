import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Complaints.css';

function Complaints() {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);

    // Fetch complaints from backend
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/complaints');
                const data = await response.json();
                setComplaints(data);
            } catch (error) {
                console.error("Failed to fetch complaints:", error);
            }
        };
        fetchComplaints();
    }, []);

    const handleInProgress = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/complaints/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'inProgress' }),
            });

            setComplaints((prev) =>
                prev.map((complaint) =>
                    complaint._id === id
                        ? { ...complaint, status: 'inProgress' }
                        : complaint
                )
            );
        } catch (error) {
            console.error("Failed to update complaint status:", error);
        }
    };

    return (
        <div>
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
                <div className="apply-group">
                    <button className="btn btn-filled">Apply</button>
                </div>
            </div>

            <div className="page-center">
                {complaints.map((complaint) => (
                    <div className={`item-box ${complaint.status === 'inProgress' ? 'in-progress' : ''}`} key={complaint._id}>
                        <div className="item-content">
                            <div className="item-info">
                                <h4 className="item-title">Issued By: {complaint.issuedByName}</h4>
                                <p className="item-date">{new Date(complaint.date).toLocaleDateString()}</p>
                                <p className="item-sub">{complaint.description}</p>
                            </div>
                        </div>

                        <div className="item-buttons">
                            <div className={`complaint-card ${complaint.status === 'inProgress' ? 'in-progress' : ''}`}>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => handleInProgress(complaint._id)}
                                    disabled={complaint.status === 'inProgress'}
                                >
                                    {complaint.status === 'inProgress' ? 'Handling' : 'Mark In Progress'}
                                </button>
                            </div>

                            <button
                                className="btn btn-filled"
                                onClick={() => navigate('/review', { state: { id: complaint._id } })}
                            >
                                Resolve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Complaints;
