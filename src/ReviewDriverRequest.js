import './ReviewDriverRequest.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

function ReviewDriverRequest() {
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const { state } = useLocation();
    const userId = state?.userId;

    useEffect(() => {
        console.log('userId received:', userId);

        if (!userId) return;

        fetch(`${API_URL}/api/approve/user/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error('Error fetching user:', err));
    }, [userId]);

    const handleApprove = async () => {
        try {
            const res = await fetch(`${API_URL}/api/approve/user/${userId}/approve`, {
                method: 'PUT',
            });

            if (res.ok) {
                setShowApproveModal(true);
            } else {
                const data = await res.json();
                alert(`Failed to approve user: ${data.message}`);
            }
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Something went wrong while approving the user.");
        }
    };

    const handleReject = async () => {
        try {
            const res = await fetch(`${API_URL}/api/approve/user/${userId}/reject`, {
                method: 'PUT',
            });

            if (res.ok) {
                setShowRejectModal(true);
            } else {
                const data = await res.json();
                alert(`Failed to reject user: ${data.message}`);
            }
        } catch (error) {
            console.error("Error rejecting user:", error);
            alert("Something went wrong while rejecting the user.");
        }
    };


    const handleApproveOk = () => navigate('/approve-drivers');
    const handleRejectOk = () => navigate('/approve-drivers');

    if (!user) return <p>Loading...</p>;

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
                        <span className="value">{user.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Email:</span>
                        <span className="value">{user.email}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Gender:</span>
                        <span className="value">{user.gender}</span>
                    </div>
                </div>

                <hr className="section-divider" />

                <div className="section last">
  <h2 className="section-title">Documentation</h2>

  {/* Driving License */}
  <div className="info-row">
    <span className="label">Driving License:</span>
    {user.drivingLicense?.filename ? (
      <a
        href={`${API_URL}/uploads/${user.drivingLicense.filename}`}
        className="download-link"
        download
      >
        Download
      </a>
    ) : (
      <span style={{ color: 'gray', marginLeft: '10px' }}>No file uploaded</span>
    )}
  </div>

  {/* National ID */}
  <div className="info-row">
    <span className="label">National ID:</span>
    {user.nationalId?.filename ? (
      <a
        href={`${API_URL}/uploads/${user.nationalId.filename}`}
        className="download-link"
        download
      >
        Download
      </a>
    ) : (
      <span style={{ color: 'gray', marginLeft: '10px' }}>No file uploaded</span>
    )}
  </div>

  {/* Vehicle Registration */}
  <div className="info-row">
    <span className="label">Vehicle Registration:</span>
    {user.vehicleRegistration?.filename ? (
      <a
        href={`${API_URL}/uploads/${user.vehicleRegistration.filename}`}
        className="download-link"
        download
      >
        Download
      </a>
    ) : (
      <span style={{ color: 'gray', marginLeft: '10px' }}>No file uploaded</span>
    )}
  </div>
</div>



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
