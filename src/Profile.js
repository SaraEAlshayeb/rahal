// export default Profile;
import React, { useEffect, useState } from 'react';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const email = localStorage.getItem('userEmail');
            const token = localStorage.getItem('token');
            if (!email || !token) return;

            try {
                const response = await fetch(`http://localhost:5000/api/users/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }); const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    console.error("Error loading profile:", data.message);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchUserProfile();
    }, []);

    if (!user) return <div style={{ textAlign: 'center', marginTop: '40px' }}>Loading profile...</div>;

    return (
        <div
            style={{
                background: "linear-gradient(to top, rgb(246, 244, 240) 60%, rgba(247, 241, 211, 0.71) 100%)",
                minHeight: '100vh',
                paddingTop: '40px',
                fontFamily: 'Segoe UI, sans-serif',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {/* Top Section */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #497D74, #27445D)',
                    color: '#EFE9D5',
                    padding: '40px 16px',
                    textAlign: 'center',
                    borderBottomLeftRadius: '40px',
                    borderBottomRightRadius: '40px',
                    width: '100%'
                }}
            >
                <img
                    src={user.profileImage || "/profile.png"}
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
            <div
                style={{
                    maxWidth: '500px',
                    margin: '30px auto 40px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    padding: '24px',
                    width: '90%'
                }}
            >
                <h3
                    style={{
                        color: '#27445D',
                        borderBottom: '1px solid #EFE9D5',
                        paddingBottom: '8px',
                        fontSize: '18px'
                    }}
                >
                    Profile Details
                </h3>

                <div style={{ marginTop: '16px', lineHeight: '1.8', fontSize: '14px' }}>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Status:</strong> {user.status}</p>
                    <p><strong>National ID:</strong> {typeof user.nationalId === 'string' ? user.nationalId : user.nationalId?.originalname}</p>
                    <p><strong>Driving License:</strong> {typeof user.drivingLicense === 'string' ? user.drivingLicense : user.drivingLicense?.originalname}</p>
                    <p><strong>Vehicle Reg:</strong> {typeof user.vehicleRegistration === 'string' ? user.vehicleRegistration : user.vehicleRegistration?.originalname}</p>


                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>Community:</strong> {user.community?.join(", ")}</p>
                    <p><strong>Total Rides:</strong> {user.totalRides}</p>
                    <p><strong>Rate:</strong> {user.rate ?? "Not rated"}</p>
                </div>

                <div style={{
                    marginTop: '24px',
                    display: 'flex',
                    justifyContent: "flex-end"
                }}>
                    <button
                        style={{
                            backgroundColor: '#27445D',
                            border: 'none',
                            padding: '8px 14px',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '13px',
                            fontFamily: "Arial, sans-serif",
                            cursor: 'pointer'
                        }}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;