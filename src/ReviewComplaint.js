import React, { useEffect, useState } from 'react';
import './ReviewComplaint.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ReviewComplaint() {
    const navigate = useNavigate();
    const location = useLocation();
    const complaintId = location.state?.id;

    const [complaint, setComplaint] = useState(null);

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/complaints`);
                const data = await res.json();
                const selected = data.find(c => c._id === complaintId);
                setComplaint(selected);
            } catch (err) {
                console.error("Error fetching complaint:", err);
            }
        };

        if (complaintId) fetchComplaint();
    }, [complaintId]);

    const handleResolved = async () => {
        try {
            await fetch(`http://localhost:5000/api/complaints/${complaintId}`, {
                method: 'DELETE',
            });
            navigate('/complaints');
        } catch (error) {
            console.error("Failed to resolve complaint:", error);
        }
    };

    if (!complaint) return <p>Loading complaint...</p>;

    return (
        <div className="review-page">
            <div className="box-left">
                <div>
                    <h2>Complaint Description</h2>
                    <br /><br />
                    <div className="description-box">
                        <p>{complaint.description}</p>
                    </div>
                </div>

                <div className="buttons-bottom">
                    <button className="btn btn-filled" onClick={handleResolved}>Resolved</button>
                    <button className="btn btn-outline" onClick={() => navigate('/complaints')}>
                        Back to Complaints
                    </button>
                </div>
            </div>
            <div className="box-right">
  <h2>Contact Info</h2>
  <br /><br />
  <p><strong>Issued By:</strong> {complaint.issuedByName}</p>
  <p><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
  <p><strong>Driver Name:</strong> {complaint.driverName}</p>
  <p><strong>Email:</strong> {complaint.issuedByEmail}</p>
  <p><strong>Phone:</strong> {complaint.issuedByPhone}</p>
</div>

        </div>
    );
}

export default ReviewComplaint;
