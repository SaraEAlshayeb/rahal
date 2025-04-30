import React, { useState, useEffect } from "react";
import { Container, Row, Col, Toast, ToastContainer, Button } from "react-bootstrap";
import "./Community.css";

function Community() {
    const [expanded, setExpanded] = useState(Array(8).fill(false));
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [communityData, setCommunityData] = useState([]);

    useEffect(() => {
        // Fetch the community data from the backend
        const fetchCommunityData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/community/getCommunityData");
                const data = await response.json();
                setCommunityData(data);  // Set community data with member count
            } catch (error) {
                console.error("Error fetching community data:", error);
            }
        };

        fetchCommunityData();
    }, []);

    const toggleDescription = (index) => {
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
    };

    const handleJoinClick = async (communityName) => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("User not logged in");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/joinCommunity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, communityName }),
            });

            const data = await response.json();

            if (response.ok) {
                setToastMessage(`You have successfully joined the ${communityName} community.`);
                setShowToast(true);

                setTimeout(() => {
                    setShowToast(false);
                }, 3000);

            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Join community error:", error);
            alert("Error connecting to server");
        }
    };

    return (
        <div className="pt-4 pb-5">
            <div className="text-center mb-4">
                <h2 style={{ marginBottom: "0px" }}>Where Community Meets the Road</h2>
                <p>
                    Join a community to connect with riders who share your background,
                    making every trip more trusted and personalized.
                </p>
            </div>

            <Container style={{ maxWidth: "800px" }}>
                <Row className="justify-content-center g-4">
                    {communityData.map((community, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center p-2">
                            <div className="community-container">
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
                                        width: "100%",
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
                                            👥 {community.members} members
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
                                                backgroundColor: "#27445D",
                                                color: "white",
                                                cursor: "pointer",
                                                borderBottomLeftRadius: "7px"
                                            }}
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
                                                backgroundColor: "#27445D",
                                                color: "white",
                                                cursor: "pointer",
                                                borderBottomRightRadius: "7px"
                                            }}
                                        >
                                            Join
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            <ToastContainer position="bottom-center" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} autohide delay={3000}>
                    <Toast.Body
                        style={{
                            backgroundColor: "#27445D",
                            color: "white",
                            textAlign: "center",
                            borderRadius: "5px"
                        }}
                    >
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}

export default Community;
