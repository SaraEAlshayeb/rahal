// export default ManageProfiles;
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import './ManageProfiles.css';

function ManageProfiles() {
    const [showModal, setShowModal] = useState(false);
    const [activeUserName, setActiveUserName] = useState('');
    const [suspendedUsers, setSuspendedUsers] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/users");
                const data = await response.json();
                if (response.ok) {
                    setUserProfiles(data);
                    setSuspendedUsers(data.filter(user => user.status === "suspended").map(user => user.name));
                }
            } catch (error) {
                console.error("Error loading users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setActiveUserName('');
    };

    const handleSuspendClick = async (user) => {
        try {
            const response = await fetch("http://localhost:5000/suspend-user", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email })
            });

            const data = await response.json();

            if (response.ok) {
                setSuspendedUsers(prev => [...prev, user.name]);
                setActiveUserName(user.name);
                setShowModal(true);
            } else {
                alert(data.message || "Failed to suspend user");
            }
        } catch (error) {
            console.error("Suspend error:", error);
            alert("Server error while suspending user");
        }
    };


    const viewProfile = (user) => {
        navigate('/Profile', { state: user });
    };

    return (
        <div className="body py-5">
            <div className="text-center mb-4">
                <h2>Manage User Profiles</h2>
                <p>View or suspend user accounts within your community.</p>
            </div>

            <Container style={{ maxWidth: "800px" }}>
                <Row className="justify-content-center g-4">
                    {userProfiles.map((user, index) => {
                        const isSuspended = suspendedUsers.includes(user.name);

                        return (
                            <Col key={index} xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center p-2">
                                <div className="profileContainer">
                                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                                        <img
                                            className="profileImage"
                                            src={user.profileImage || "./profile.png"}
                                            alt="user"
                                        />
                                    </div>


                                    <div className="profileDetails">
                                        <div className="p-2">
                                            <p className="mb-1"><strong>Name:</strong> {user.name}</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            width: "100%",
                                            borderTop: "1px solid #ccc"
                                        }}>
                                            <button
                                                onClick={() => viewProfile(user)}
                                                className="btn btnLeft"
                                            >
                                                View
                                            </button>

                                            <div style={{ width: "1px", backgroundColor: "lightgray" }} />
                                            <button
                                                onClick={() => handleSuspendClick(user)}
                                                disabled={isSuspended}
                                                className={`btn btnRight ${isSuspended ? 'btn-secondary' : ''}`}
                                            >
                                                {isSuspended ? "Suspended" : "Suspend User"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Suspended</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have suspended the user <strong>{activeUserName}</strong>.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ManageProfiles;

