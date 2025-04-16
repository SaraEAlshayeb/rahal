import './ReviewDriverRequest.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewDriverRequest() {
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const navigate = useNavigate();

    const handleApprove = () => {
        setShowApproveModal(true);
    };

    const handleApproveOk = () => {
        navigate('/approve-drivers');
    };

    const handleReject = () => {
        setShowRejectModal(true);
    };

    const handleRejectOk = () => {
        navigate('/approve-drivers');
    };

    return (
        <div className="review-page">
            <div className="section-wrapper">
                <div className="section">
                    <h3 className="section-title page-title">Review Request</h3>
                </div>
                <hr className="section-divider" />

                <div className="section">
                    <h2 className="section-title">Personal Info</h2>
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

                <hr className="section-divider" />

                <div className="section last">
                    <h2 className="section-title">Documentation</h2>
                    <div className="info-row">
                        <span className="label">Driver License:</span>
                        <a href="/path-to-file.pdf" download className="download-link">Download</a>
                    </div>
                </div>

                <hr className="section-divider" />

                <div className="buttons-bottom">
                    <button className="btn btn-filled" onClick={handleApprove}>Approve</button>
                    <button className="btn btn-outline" onClick={handleReject}>Reject</button>
                </div>
            </div>

            {/* ✅ Approve Modal */}
            {showApproveModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Approved</h5>
                                </div>
                                <div className="modal-body">
                                    <p>Driver request approved successfully!</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-success" onClick={handleApproveOk}>OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ❌ Reject Modal */}
            {showRejectModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Rejected</h5>
                                </div>
                                <div className="modal-body">
                                    <p>Driver request has been rejected successfully.</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" onClick={handleRejectOk}>OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ReviewDriverRequest;
