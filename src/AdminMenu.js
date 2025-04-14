import React from 'react';
import './AdminMenu.css';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AdminMenu() {
    const navigate = useNavigate();
    <button className="admin-btn" onClick={() => navigate('/manage-communities')}>Start</button>


    return (
        <div>
            <div className="admin-toolbar">
                <img src="/Rahal_Logo.png" alt="Logo" className="toolbar-logo" />
                <span className="logout-text">Logout</span>
            </div>


            <div className="admin-header">
                <br/><br/><br/>
                <h1>Hey, Admin!</h1>
                <p>Ready to shape a smoother ride-sharing experience?</p>
            </div>
            <div className="admin-wrapper">
                {/* Card 1: image left, box right */}
                <div className="admin-card">
                    <img src="/CreateComunity.png" alt="Admin 1" className="admin-img" />
                    <div className="admin-box" id="box1">
                        <br/>
                        <h3>Manage Communities</h3>
                        <br/><br/>
                        <p>Create, edit, and manage communities categorized by institutions, interests, or regions.</p>

                        <button className="admin-btn" onClick={() => navigate('/manage-communities')}>Start</button>


                    </div>
                </div>

                {/* Card 2: box left, image right */}
                <div className="admin-card">
                    <div className="admin-box" id="box2">
                        <br/>
                        <h3>Handle Users' Complaints</h3>
                        <br/><br/>
                        <p>View and resolve user complaints by reviewing detailed information associated.</p>
                        <button className="admin-btn" onClick={() => navigate('/complaints')}>Start</button>

                    </div>
                    <img src="/Complaints.png" alt="Admin 2" className="admin-img" />
                </div>

                <div className="admin-card">
                    <img src="/ApproveDriver.png" alt="Admin 1" className="admin-img" />
                    <div className="admin-box" id="box3">
                        <br/>
                        <h3>Approve Driver Requests</h3>
                        <br/><br/>
                        <p>Review and approve driver applications by verifying licenses, vehicle registration.</p>
                        <button className="admin-btn" onClick={() => navigate('/approve-drivers')}>Start</button>

                    </div>
                </div>
            </div>

        </div>

    );
}

export default AdminMenu;
