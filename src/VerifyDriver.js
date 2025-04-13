import React from 'react';
import { useNavigate } from 'react-router-dom';
function VerifyDriver() {

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: "url('/PageBackground.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                padding: "2rem"
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(73,125,116,0.7)",
                    color: "white",
                    padding: "2rem",
                    borderRadius: "16px",
                    textAlign: "center",
                    maxWidth: "600px",
                    width: "100%",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
                }}
            >
                <h2>Thanks for taking the initiative!</h2>
                <p>Your request is now pending. You can post a ride once you're verified.</p>
                <p>We'll contact you soon via email.</p>
            </div>
        </div>
    );
}

export default VerifyDriver;
