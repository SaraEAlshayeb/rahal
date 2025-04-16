import React from 'react';
import { useLocation } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const user = location.state || {
        name: "Unknown User",
        email: "N/A",
        phone: "N/A",
        memberSince: "N/A",
        img: "/profile.png"
    };

    return (
        <div style={{ backgroundColor: '#EFE9D5', minHeight: '100vh', paddingTop: '60px', fontFamily: 'Segoe UI, sans-serif' }}>
            {/* Top Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #497D74, #27445D)',
                color: '#EFE9D5',
                padding: '60px 20px',
                textAlign: 'center',
                borderBottomLeftRadius: '60px',
                borderBottomRightRadius: '60px'
            }}>
                <img
                    src={user.img || "/profile.png"}
                    alt="Profile"
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: '5px solid #EFE9D5',
                        marginBottom: '20px'
                    }}
                />
                <h1 style={{ fontSize: '28px', marginBottom: '5px' }}>{user.name}</h1>
                <p style={{ fontSize: '16px', opacity: 0.9 }}>Rahal user</p>
            </div>

            {/* Info Section */}
            <div style={{
                maxWidth: '700px',
                margin: '40px auto',
                backgroundColor: 'white',
                borderRadius: '20px',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                padding: '40px'
            }}>
                <h2 style={{ color: '#497D74', borderBottom: '2px solid #EFE9D5', paddingBottom: '10px' }}>Profile Details</h2>

                <div style={{ marginTop: '20px', lineHeight: '2' }}>
                    <p><strong>Name:</strong> {user.name|| "Farah"}</p>
                    <p><strong>Email:</strong> {user.email || 'Farah@gmail.com'}</p>
                    <p><strong>Phone:</strong> {user.phone || '0551111111'}</p>
                    <p><strong>Member Since:</strong> {user.memberSince || '2025/04/02'}</p>
                </div>

                {/* Optional action buttons */}
                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                    <button style={{
                        backgroundColor: '#71BBB2',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        color: '#27445D',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: '0.3s'
                    }}>Edit Profile</button>

                    <button style={{
                        backgroundColor: '#497D74',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: '0.3s'
                    }}>Change Password</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
