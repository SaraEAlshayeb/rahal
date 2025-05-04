// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap';
// import './Community.css';

// function ManageCommunities() {
//     const navigate = useNavigate();

//     const communityData = [
//         { name: "KFUPM", img: "./KFUPM.png" },
//         { name: "PNU", img: "./PNU.png" },
//         { name: "KSAU", img: "./KSAU.png" },
//         { name: "KFU", img: "./KFU.png" },
//         { name: "PMU", img: "./PMU.png" },
//         { name: "IAU", img: "./IAU.png" },
//     ];



//     return (
//         <div className="pt-4 pb-5">
//             <div className="text-center mb-4">
//                 <h2 style={{ marginBottom: "0px" }}>Manage Communities</h2>
//                 <p>
//                     edit, and manage communities categorized by institutions, interests, or regions.
//                 </p>
//             </div>

//             <Container style={{ maxWidth: "800px" }}>
//                 <Row className="justify-content-center g-4">
//                     {communityData.map((community, index) => (
//                         <Col key={index} xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center p-2">
//                             <div className="community-container">
//                                 <img
//                                     style={{
//                                         borderColor: "lightgray",
//                                         borderStyle: "solid",
//                                         borderWidth: "2px",
//                                         borderRadius: "50%",
//                                         height: "100px",
//                                         position: "relative",
//                                         top: "40px"
//                                     }}
//                                     src={community.img}
//                                     alt="community"
//                                 />
//                                 <div
//                                     style={{
//                                         backgroundColor: "whitesmoke",
//                                         marginTop: "65px",
//                                         width: "100%",
//                                         height: "190px",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         justifyContent: "space-between"
//                                     }}
//                                 >
//                                     <div style={{ padding: "10px" }}>
//                                         <p style={{ color: "black", fontSize: "12px", marginBottom: "0px", marginLeft: "5px" }}>
//                                             <strong>Name:</strong> {community.name}
//                                         </p>
//                                         <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "0px", marginLeft: "5px" }}>
//                                             👥 2,135 members
//                                         </p>

//                                     </div>

//                                     <div style={{
//                                         display: "flex",
//                                         width: "100%",
//                                         borderTop: "1px solid #ccc"
//                                     }}>
//                                         <button
//                                             style={{
//                                                 flex: 1,
//                                                 padding: "8px 0",
//                                                 fontSize: "11.5px",
//                                                 border: "none",
//                                                 backgroundColor: "#27445D",
//                                                 color: "white",
//                                                 cursor: "pointer",
//                                                 borderBottomLeftRadius: "7px"
//                                             }}
//                                         >
//                                             Delete
//                                         </button>

//                                         <div style={{ width: "1px", backgroundColor: "lightgray" }} />

//                                         <button
//                                             style={{
//                                                 flex: 1,
//                                                 padding: "8px 0",
//                                                 fontSize: "11.5px",
//                                                 border: "none",
//                                                 backgroundColor: "#27445D",
//                                                 color: "white",
//                                                 cursor: "pointer",
//                                                 borderBottomRightRadius: "7px"
//                                             }}
//                                         >
//                                             Edit
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default ManageCommunities;
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import './Community.css';

function ManageCommunities() {
    const [communityData, setCommunityData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCommunityName, setNewCommunityName] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchCommunities();
    }, []);

    const fetchCommunities = async () => {
        try {
            const response = await fetch(`${API_URL}/api/community`);
            const data = await response.json();
            if (response.ok) {
                setCommunityData(data);
            }
        } catch (error) {
            console.error("Error loading communities:", error);
        }
    };

    const handleDelete = async (name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${API_URL}/api/community/${name}`, {
                method: "DELETE"
            });
            const data = await response.json();

            if (response.ok) {
                setCommunityData(prev => prev.filter(c => c.name !== name));
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const handleAddCommunity = async () => {
        if (!newCommunityName) return;

        try {
            const response = await fetch(`${API_URL}/api/community`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newCommunityName })
            });

            const data = await response.json();

            if (response.ok) {
                setCommunityData(prev => [
                    ...prev,
                    { name: newCommunityName, members: [], img: `./${newCommunityName}.png` }
                ]);
                setShowModal(false);
                setNewCommunityName("");
            } else {
                alert(data.message || "Failed to add community");
            }
        } catch (error) {
            console.error("Add error:", error);
        }
    };

    return (
        <div className="pt-4 pb-5">
            <div className="text-center mb-4">
                <h2 style={{ marginBottom: "0px" }}>Manage Communities</h2>
                <p>
                    edit, and manage communities categorized by institutions, interests, or regions.
                </p>
            </div>

            <Container style={{ maxWidth: "800px" }}>
                <Row className="justify-content-center g-4">
                    {/* 1. Map all existing communities */}
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
                                    src={`./${community.name}.png`}
  alt={community.name}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/default.png'; // Fallback image
  }}
                                />
                                <div
                                    style={{
                                        backgroundColor: "whitesmoke",
                                        marginTop: "65px",
                                        width: "100%",
                                        height: "190px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <div style={{ padding: "10px" }}>
                                        <p style={{ color: "black", fontSize: "12px", marginBottom: "0px", marginLeft: "5px" }}>
                                            <strong>Name:</strong> {community.name}
                                        </p>
                                        <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "0px", marginLeft: "5px" }}>
                                            👥 {community.members} members
                                        </p>
                                    </div>

                                    <div style={{
                                        display: "flex",
                                        width: "100%",
                                        borderTop: "1px solid #ccc"
                                    }}>
                                        <button
                                            onClick={() => handleDelete(community.name)}
                                            style={{
                                                flex: 1,
                                                padding: "8px 0",
                                                fontSize: "11.5px",
                                                border: "none",
                                                backgroundColor: "#27445D",
                                                color: "white",
                                                cursor: "pointer",
                                                borderBottomLeftRadius: "7px",
                                                borderBottomRightRadius: "7px"
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}

                    {/* 2. Add (+) Button - always at the end */}
                    <Col xs={12} sm={6} md={4} lg={4} className="d-flex justify-content-center p-2">
                        <div
                            onClick={() => setShowModal(true)}
                            className="community-container d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: "whitesmoke",
                                marginTop: "65px",
                                width: "100%",
                                height: "190px",
                                cursor: "pointer",
                                fontSize: "48px",
                                fontWeight: "bold",
                                color: "#27445D",
                                border: "2px dashed #ccc",
                                borderRadius: "12px",
                                transition: "0.3s"
                            }}
                        >
                            +
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Modal for Adding Community */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Community</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Community Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g., KFUPM"
                                value={newCommunityName}
                                onChange={(e) => setNewCommunityName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddCommunity}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ManageCommunities;
