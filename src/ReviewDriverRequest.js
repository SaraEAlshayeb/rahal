import React from 'react';
import './ReviewDriverRequest.css';
function ReviewDriverRequest() {
    return (
        <div className="review-page">
            <div className="box-left">
                <div className="section-wrapper">
                    <div className="section">
                        <h3 className="section-title">Review Request</h3>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Personal Info</h3>
                        <div className="info-row">
                            <span className="label">Name:</span>
                            <span className="value">Lamyaa Alyousef</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Age:</span>
                            <span className="value">18</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Email:</span>
                            <span className="value">email@hotmail.com</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Gender:</span>
                            <span className="value">Female</span>
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Documentation:</h3>
                    </div> {/* ✅ properly closed this div */}

                    <div className="buttons-bottom">
                        <button className="btn btn-filled">Suspend User</button>
                        <button className="btn btn-filled">Contact issuer</button>
                        <button className="btn btn-outline">Back to Complaints</button>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default ReviewDriverRequest;
