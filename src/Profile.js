import React from 'react';
import { useLocation } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const user = location.state || {
        name: "Farah",
        email: "farah27oct@gmail.com",
        phone: "0537845284",
        memberSince: "March 2024",
        img: "/profile.png",
        status: "Active",
        community: "KFUPM"
    };

    return (
        <div style={{
            background: "linear-gradient(to top, rgb(246, 244, 240) 60%, rgba(247, 241, 211, 0.71) 100%)",
            minHeight: '100vh',
            paddingTop: '40px',
            fontFamily: 'Segoe UI, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {/* Top Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #497D74, #27445D)',
                color: '#EFE9D5',
                padding: '40px 16px',
                textAlign: 'center',
                borderBottomLeftRadius: '40px',
                borderBottomRightRadius: '40px',
                width: '100%'
            }}>
                <img
                    src={user.img || "/profile.png"}
                    alt="Profile"
                    style={{
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        border: '3px solid #EFE9D5',
                        marginBottom: '12px'
                    }}
                />
                <h2 style={{ fontSize: '22px', marginBottom: '4px', color: "#fff" }}>{user.name}</h2>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>Rahal user</p>
            </div>

            {/* Info Section */}
            <div style={{
                maxWidth: '500px',
                margin: '30px auto 40px',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                padding: '24px',
                width: '90%'
            }}>
                <h3 style={{
                    color: '#27445D',
                    borderBottom: '1px solid #EFE9D5',
                    paddingBottom: '8px',
                    fontSize: '18px'
                }}>Profile Details</h3>

                <div style={{ marginTop: '16px', lineHeight: '1.8', fontSize: '14px' }}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Member Since:</strong> {user.memberSince}</p>
                    <p><strong>Status:</strong> {user.status || "Active"}</p>
                    <p><strong>Community:</strong> {user.community || "KFUPM"}</p>
                </div>

                {/* Buttons */}
                <div style={{
                    marginTop: '24px',
                    display: 'flex',
                    justifyContent: "flex-end",
                    gap: '10px'
                }}>
                    <button style={{
                        backgroundColor: '#27445D',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '13px',
                        fontFamily: "Arial, sans-serif",
                        cursor: 'pointer'
                    }}>Edit Profile</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
