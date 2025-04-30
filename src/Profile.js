// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './Profile.css';



// function Profile() {
//     const location = useLocation();
//     const user = location.state || {
//         name: "Farah",
//         email: "farah27oct@gmail.com",
//         phone: "0537845284",
//         img: "/profile.png",
//         status: "Active",
//         community: "KFUPM"
//     };

//     return (
//         <div style={{
//             background: "linear-gradient(to top, rgb(246, 244, 240) 60%, rgba(247, 241, 211, 0.71) 100%)",
//             className: "profile-banner",
//             minHeight: '100vh',
//             paddingTop: '40px',
//             fontFamily: 'Segoe UI, sans-serif',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center'
//         }}>
//             {/* Top Banner */}
//             <div style={{
//                 background: 'linear-gradient(135deg, #497D74, #27445D)',
//                 color: '#EFE9D5',
//                 padding: '40px 16px',
//                 textAlign: 'center',
//                 borderBottomLeftRadius: '40px',
//                 borderBottomRightRadius: '40px',
//                 width: '100%'
//             }}>
//                 <img
//                     src={user.img || "/profile.png"}
//                     alt="Profile"
//                     style={{
//                         className:"profile-image",
//                         width: '90px',
//                         height: '90px',
//                         borderRadius: '50%',
//                         border: '3px solid #EFE9D5',
//                         marginBottom: '12px'
//                     }}
//                 />
//                 <h2 style={{ fontSize: '22px', marginBottom: '4px', color: "#fff" }}>{user.name}</h2>
//                 <p style={{ fontSize: '14px', opacity: 0.9 }}>Rahal user</p>
//             </div>

//             {/* Info Section */}
//             <div style={{
//                 maxWidth: '500px',
//                 className: "profile-details-box",
//                 margin: '30px auto 40px',
//                 backgroundColor: 'white',
//                 borderRadius: '16px',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
//                 padding: '24px',
//                 width: '90%'
//             }}>
//                 <h3 style={{
//                     color: '#27445D',
//                     borderBottom: '1px solid #EFE9D5',
//                     paddingBottom: '8px',
//                     fontSize: '18px'
//                 }}>Profile Details</h3>

//                 <div style={{ marginTop: '16px', lineHeight: '1.8', fontSize: '14px' }}>
//                     <p><strong>Name:</strong> {user.name}</p>
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <p><strong>Phone:</strong> {user.phone}</p>
//                     <p><strong>Status:</strong> {user.status || "Active"}</p>
//                     <p><strong>Community:</strong> {user.community || "KFUPM"}</p>
//                 </div>

//                 {/* Buttons */}
//                 <div style={{
//                     marginTop: '24px',
//                     className: "profile-buttons",
//                     display: 'flex',
//                     justifyContent: "flex-end",
//                     gap: '10px'
//                 }}>
//                     <button style={{
//                         backgroundColor: '#27445D',
//                         border: 'none',
//                         padding: '8px 14px',
//                         borderRadius: '6px',
//                         color: '#fff',
//                         fontSize: '13px',
//                         fontFamily: "Arial, sans-serif",
//                         cursor: 'pointer'
//                     }}>Edit Profile</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Profile;
import React, { useEffect, useState } from 'react';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const email = localStorage.getItem('userEmail');
            if (!email) return;

            try {
                const response = await fetch(`http://localhost:5000/profile?email=${email}`);
                const data = await response.json();

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
                    <p><strong>National ID:</strong> {user.nationalId}</p>
                    <p><strong>Driving License:</strong> {user.drivingLicense}</p>
                    <p><strong>Vehicle Reg:</strong> {user.vehicleRegistration}</p>
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
