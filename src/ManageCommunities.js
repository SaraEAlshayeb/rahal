import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Community.css';

function ManageCommunities() {
    const navigate = useNavigate();

    const communityData = [
        { name: "KFUPM", img: "./kfupmLogo.png" },
        { name: "PNU", img: "./PNU.png" },
        { name: "KSAU", img: "./KSAU.png" },
        { name: "KFU", img: "./KFU.png" },
        { name: "PMU", img: "./PMU.png" },
        { name: "IAU", img: "./IAU.png" },
    ];



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
                                            👥 2,135 members
                                        </p>

                                    </div>

                                    <div style={{
                                        display: "flex",
                                        width: "100%",
                                        borderTop: "1px solid #ccc"
                                    }}>
                                        <button
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
                                            Delete
                                        </button>

                                        <div style={{ width: "1px", backgroundColor: "lightgray" }} />

                                        <button
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
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default ManageCommunities;
