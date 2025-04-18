import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import './ManageProfiles.css';

function ManageProfiles() {
    const [showModal, setShowModal] = useState(false);
    const [activeUserName, setActiveUserName] = useState('');
    const [suspendedUsers, setSuspendedUsers] = useState([]);
    const navigate = useNavigate();

    const userProfiles = [
        { name: "Sara Alshayeb", img: "./profile.png", email: "sara@example.com", phone: "0501234567", memberSince: "January 2024" },
        { name: "Lamyaa Alyousef", img: "./profile.png", email: "lamyaa@example.com", phone: "0507654321", memberSince: "February 2024" },
        { name: "Norah Alkanhal", img: "./profile.png", email: "norah@example.com", phone: "0551237890", memberSince: "March 2024" },
        { name: "Sara Alshlaly", img: "./profile.png", email: "Sara@hotmail.com", phone: "0135894235", memberSince: "April 2024" },
        { name: "Farah Almutairi", img: "./profile.png", email: "farah@kfupm.edu.sa", phone: "0138495672", memberSince: "May 2024" },
        { name: "Remas Alghamdi", img: "./profile.png", email: "remas@gmail.com", phone: "0138673000", memberSince: "June 2024" }
    ];

    const handleClose = () => {
        setShowModal(false);
        setActiveUserName('');
    };

    const handleSuspendClick = (userName) => {
        setActiveUserName(userName);
        setShowModal(true);
        setSuspendedUsers(prev => [...prev, userName]);
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

            <Container  style={{ maxWidth: "800px"}}>
                <Row className="justify-content-center g-4" >
                    {userProfiles.map((user, index) => {
                        const isSuspended = suspendedUsers.includes(user.name);

                        return (
                            <Col key={index} xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center p-2">
                                <div className="profileContainer">
                                    <img
                                        className="profileImage"
                                        src={user.img}
                                        alt="user"
                                    />
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
                                                onClick={() => handleSuspendClick(user.name)}
                                                disabled={isSuspended}
                                                className={`btn btnRight ${isSuspended ? 'btn-secondary' : 'btn btnRight'}`}
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
