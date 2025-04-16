import React, { useState } from 'react';
import './Community.css';
import { Modal, Button } from 'react-bootstrap';

function Community() {
    const [showModal, setShowModal] = useState(false);
    const [activeModalCommunity, setActiveModalCommunity] = useState('');
    const [expanded, setExpanded] = useState({});

    const handleJoinClick = (communityName) => {
        setActiveModalCommunity(communityName);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setActiveModalCommunity('');
    };

    const toggleDescription = (index) => {
        setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const isAnyExpanded = [0, 1, 2].some((index) => expanded[index]);

    const communityData = [
        { name: "KFUPM", img: "./kfupmLogo.png" },
        { name: "PNU", img: "./PNU.png" },
        { name: "KSAU", img: "./KSAU.png" },
        { name: "KFU", img: "./KFU.png" },
        { name: "PMU", img: "./PMU.png" },
        { name: "IAU", img: "./IAU.png" },
    ];

    return (
        <div className="body" style={{ paddingTop: "60px", height: "150vh" }}>
            <div style={{ display: "flex", margin:"20px",flexDirection: "column", alignItems: "center" }}>
                <h2 style={{ marginBottom: "0px" }}>Where Community Meets the Road</h2>
                <p>
                    Join a community to connect with riders who share your background, making every trip more trusted and personalized.
                </p>
            </div>
            <div style={{display:"flex",justifyContent: "center",alignItems:"center"}}> <div style={{
                marginTop: "15px", display: "flex",
                flexDirection: "row", justifyContent: "center",
                columnGap: "60px", rowGap: isAnyExpanded ? "170px" : "60px",
                alignItems: "center", flexWrap: "wrap", width: "800px"
            }}>
                {communityData.map((community, index) => (
                    <div className="community-container" key={index}>
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
                            src={community.img}
                            alt="community"
                        />
                        <div
                            style={{
                                backgroundColor: "whitesmoke",
                                marginTop: "65px",
                                width: expanded[index] ? "100%" : "220px",
                                height: expanded[index] ? "100%" : "150px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                transition: "all 0.3s ease"
                            }}
                        >
                            <div style={{ padding: "10px" }}>
                                <p style={{ color: "black", fontSize: "12px", marginBottom: "0px", marginLeft: "5px" }}>
                                    <strong>Name:</strong> {community.name}
                                </p>
                                <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "0px", marginLeft: "5px" }}>
                                    👥 2,135 members
                                </p>
                                {expanded[index] && (
                                    <p style={{ fontSize: "12px", marginTop: "5px", marginLeft: "5px", marginRight: "5px" }}>
                                        <strong>Description:</strong> A place for {community.name} students and alumni
                                        to connect, share rides, and grow together.
                                    </p>
                                )}
                            </div>

                            <div style={{
                                display: "flex",
                                width: "100%",
                                borderTop: "1px solid #ccc"
                            }}>
                                <button
                                    onClick={() => toggleDescription(index)}
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
                                    {expanded[index] ? 'Show Less' : 'Show More'}
                                </button>

                                <div style={{ width: "1px", backgroundColor: "lightgray" }} />

                                <button
                                    onClick={() => handleJoinClick(community.name)}
                                    style={{
                                        flex: 1,
                                        padding: "8px 0",
                                        fontSize: "11.5px",
                                        border: "none",
                                        backgroundColor: "#497D74",
                                        color: "white",
                                        cursor: "pointer",
                                        borderBottomRightRadius: "7px",
                                        transition: "background-color 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#3a655d"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#497D74"}
                                >
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                ))}</div>


            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Joined Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You are now a member of the {activeModalCommunity} community! 🎉
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

export default Community;
