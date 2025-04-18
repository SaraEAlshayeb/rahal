import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './HomeMenu.css';

function Home() {
    const navigate = useNavigate();
    const [visibleCards, setVisibleCards] = useState([]);

    useEffect(() => {
        const total = 4;
        for (let i = 0; i < total; i++) {
            setTimeout(() => {
                setVisibleCards((prev) => [...prev, i]);
            }, i * 300);
        }
    }, []);

    return (
        <div>
            <div className="user-header">
                <br /><br /><br /><br /><br />
                <h1>Welcome!</h1>
                <p>What are we up to today — going for a ride or offering one?</p>
            </div>

            <div className="user-wrapper">
                {/* Card 1 */}
                <div className={`user-card ${visibleCards.includes(0) ? 'show' : ''}`}>
                    <img src="/CreateComunity.png" alt="Join Community" className="user-img" />
                    <div className="user-box" id="box1">
                        <br />
                        <h3>Join Community</h3>
                        <br /><br />
                        <p>Connect with like-minded riders and drivers near you.</p>
                        <button className="user-btn" onClick={() => navigate('/community')}>Start</button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className={`user-card ${visibleCards.includes(1) ? 'show' : ''}`}>
                    <div className="user-box" id="box2">
                        <br />
                        <h3>Offer a Ride</h3>
                        <br /><br />
                        <p>Got space? Share your ride and help someone get there.</p>
                        <button className="user-btn" onClick={() => navigate('/post-ride')}>Start</button>
                    </div>
                    <img src="/postRide.png" alt="Offer a Ride" className="user-img" />
                </div>

                {/* Card 3 */}
                <div className={`user-card ${visibleCards.includes(2) ? 'show' : ''}`}>
                    <img src="/searchRide.png" alt="Find a Ride" className="user-img" />
                    <div className="user-box" id="box3">
                        <br />
                        <h3>Find a Ride</h3>
                        <br /><br />
                        <p>Browse available rides and book your next trip easily.</p>
                        <button className="user-btn" onClick={() => navigate('/book-ride')}>Start</button>
                    </div>
                </div>

                {/* Card 4 */}
                <div className={`user-card ${visibleCards.includes(3) ? 'show' : ''}`}>
                    <div className="user-box" id="box4">
                        <br />
                        <h3>Become a Driver</h3>
                        <br /><br />
                        <p>Turn miles into money by joining our driver team.</p>
                        <button className="user-btn" onClick={() => navigate('/Driver')}>Start</button>
                    </div>
                    <img src="/ChatGPT Image Apr 17, 2025, 09_45_26 PM.png" alt="Become a Driver" className="user-img" />
                </div>
            </div>
        </div>
    );
}

export default Home;
