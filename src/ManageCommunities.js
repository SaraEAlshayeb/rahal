import React from 'react';
import { useNavigate } from 'react-router-dom';
import EditCommunity from './EditCommunity';

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

    const deleteCommunity = (index) => {
        console.log(`Deleting community at index ${index}`);
    };

    const editCommunity = (community) => {
        navigate('/EditCommunity', { state: community });
    };

    return (
        <div className="body" style={{ paddingTop: "60px", height: "150vh" }}>
            <div style={{ display: "flex", margin: "20px", flexDirection: "column", alignItems: "center" }}>
                <h2 style={{ marginBottom: "0px" }}>Where Community Meets the Road</h2>
                <p>
                    Join a community to connect with riders who share your background, making every trip more trusted and personalized.
                </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    columnGap: "60px",
                    rowGap: "60px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "800px"
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
                                    width: "220px",
                                    height: "150px",
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
                                    <p style={{ fontSize: "12px", marginTop: "5px", marginLeft: "5px", marginRight: "5px" }}>
                                        <strong>Description:</strong> A place for {community.name} students and alumni
                                        to connect, share rides, and grow together.
                                    </p>
                                </div>

                                <div style={{
                                    display: "flex",
                                    width: "100%",
                                    borderTop: "1px solid #ccc"
                                }}>
                                    <button
                                        onClick={() => deleteCommunity(index)}
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
                                        Delete
                                    </button>

                                    <div style={{ width: "1px", backgroundColor: "lightgray" }} />

                                    <button
                                        onClick={() => editCommunity(community)}
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
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageCommunities;
