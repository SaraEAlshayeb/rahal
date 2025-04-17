import React from 'react';

function Profile() {
    return (
        <div style={{
            backgroundColor: '#EFE9D5',
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
                    src="/profile.png"
                    alt="Profile"
                    style={{
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        border: '3px solid #EFE9D5',
                        marginBottom: '12px'
                    }}
                />
                <h2 style={{ fontSize: '22px', marginBottom: '4px' }}>Farah</h2>
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
                    color: '#497D74',
                    borderBottom: '1px solid #EFE9D5',
                    paddingBottom: '8px',
                    fontSize: '18px'
                }}>Profile Details</h3>

                <div style={{ marginTop: '16px', lineHeight: '1.8', fontSize: '14px' }}>
                    <p><strong>Name:</strong> Farah</p>
                    <p><strong>Email:</strong> farah27oct@gmail.com</p>
                    <p><strong>Phone:</strong> 0537845284</p>
                    <p><strong>Member Since:</strong> March 2024</p>
                </div>

                {/* Buttons */}
                <div style={{
                    marginTop: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px'
                }}>
                    <button style={{
                        backgroundColor: '#71BBB2',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        color: '#27445D',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>Edit Profile</button>

                    <button style={{
                        backgroundColor: '#497D74',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>Change Password</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
