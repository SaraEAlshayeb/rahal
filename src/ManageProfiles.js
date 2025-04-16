import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import './ManageProfiles.css'

function ManageProfiles() {
    const [showModal, setShowModal] = useState(false);
    const [activeUserName, setActiveUserName] = useState('');
    const [suspendedUsers, setSuspendedUsers] = useState([]); // New state
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
        setSuspendedUsers(prev => [...prev, userName]); // Add to suspended list
    };

    const viewProfile = (user) => {
        navigate('/Profile', { state: user });
    };

    return (
        <div className="body" style={{ paddingTop: "60px", height: "150vh" }}>
            <div style={{ display: "flex", margin: "20px", flexDirection: "column", alignItems: "center" }}>
                <h2 style={{ marginBottom: "0px" }}>Manage User Profiles</h2>
                <p>View or suspend user accounts within your community.</p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    columnGap: "40px",
                    rowGap: "50px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "800px"
                }}>
                    {userProfiles.map((user, index) => {
                        const isSuspended = suspendedUsers.includes(user.name);

                        return (
                            <div className="profileContainer" key={index}>
                                <img
                                    style={{
                                        borderColor: "lightgray",
                                        borderStyle: "solid",
                                        borderWidth: "2px",
                                        borderRadius: "50%",
                                        height: "100px",
                                        position: "relative",
                                        top: "40px"
                                    }}
                                    src={user.img}
                                    alt="user"
                                />
                                <div style={{
                                    backgroundColor: "whitesmoke",
                                    marginTop: "66px",
                                    width: "220px",
                                    height: "50px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <div style={{ padding: "10px" }}>
                                        <p style={{
                                            color: "black",
                                            fontSize: "12px",
                                            marginBottom: "0px",
                                            marginLeft: "5px"
                                        }}>
                                            <strong>Name:</strong> {user.name}
                                        </p>
                                    </div>

                                    <div style={{
                                        display: "flex",
                                        width: "100%",
                                        borderTop: "1px solid #ccc"
                                    }}>
                                        <button
                                            onClick={() => viewProfile(user)}
                                            style={{
                                                flex: 1,
                                                padding: "8px 0",
                                                fontSize: "11.5px",
                                                border: "none",
                                                backgroundColor: "#497D74",
                                                color: "white",
                                                cursor: "pointer",
                                                borderBottomLeftRadius: "7px",
                                                transition: "background-color 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#3a655d"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#497D74"}
                                        >
                                            View
                                        </button>

                                        <div style={{ width: "1px", backgroundColor: "lightgray" }} />

                                        <button
                                            onClick={() => handleSuspendClick(user.name)}
                                            disabled={isSuspended}
                                            style={{
                                                flex: 1,
                                                padding: "8px 0",
                                                fontSize: "11.5px",
                                                border: "none",
                                                backgroundColor: isSuspended ? "gray" : "#497D74",
                                                color: "white",
                                                cursor: isSuspended ? "not-allowed" : "pointer",
                                                borderBottomRightRadius: "7px",
                                                transition: "background-color 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSuspended) e.currentTarget.style.backgroundColor = "#3a655d"
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSuspended) e.currentTarget.style.backgroundColor = "#497D74"
                                            }}
                                        >
                                            {isSuspended ? "Suspended" : "Suspend User"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

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
