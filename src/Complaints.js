import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Complaints.css';

function Complaints() {
    const navigate = useNavigate();
    /*const [complaints, setComplaints] = useState([
        {
            id: 1,
            issuedBy: "Issued By : Lamyaa Alyousef",
            description: "Driver arrived 20 minutes late to the scheduled...",
            date: "1/2/2025",
        },
        {
            id: 2,
            issuedBy: "Issued By : Sara Alshayeb",
            description: "The car was not clean and had an odor ...",
            date: "10/2/2025",
        },
        {
            id: 3,
            issuedBy: "Issued By : Imas Alghamdi",
            description: "Driver was impolite and dismissive during...",
            date: "13/3/2025",
        },
        {
            id: 4,
            issuedBy: "Issued By : Farah Almutairi",
            description: "I was charged more than the displayed ...",
            date: "17/3/2025",
        },
        {
            id: 5,
            issuedBy: "Issued By : Sarah Alshalali",
            description: "The driver was on a phone call for the ...",
            date: "20/4/2025",
        },
        {
            id: 6,
            issuedBy: "Issued By : Mohammad Ali",
            description: "The driver did not show up at the pickup ...",
            date: "27/4/2025",
        },
        {
            id: 7,
            issuedBy: "Issued By : Fawaz Aref",
            description: "The app did not work when I tried to ...",
            date: "20/4/2025",
        },
    ]);*/
    const [complaints, setComplaints] = useState(() => {
        const stored = localStorage.getItem("complaints");
        return stored ? JSON.parse(stored) : [
            {
                id: 1,
                issuedBy: "Issued By : Lamyaa Alyousef",
                description: "Driver arrived 20 minutes late to the scheduled...",
                date: "1/2/2025",
            },
            {
                id: 2,
                issuedBy: "Issued By : Sara Alshayeb",
                description: "The car was not clean and had an odor ...",
                date: "10/2/2025",
            },
            {
                id: 3,
                issuedBy: "Issued By : Imas Alghamdi",
                description: "Driver was impolite and dismissive during...",
                date: "13/3/2025",
            },
            {
                id: 4,
                issuedBy: "Issued By : Farah Almutairi",
                description: "I was charged more than the displayed ...",
                date: "17/3/2025",
            },
            {
                id: 5,
                issuedBy: "Issued By : Sarah Alshalali",
                description: "The driver was on a phone call for the ...",
                date: "20/4/2025",
            },
            {
                id: 6,
                issuedBy: "Issued By : Mohammad Ali",
                description: "The driver did not show up at the pickup ...",
                date: "27/4/2025",
            },
            {
                id: 7,
                issuedBy: "Issued By : Fawaz Aref",
                description: "The app did not work when I tried to ...",
                date: "20/4/2025",
            },
        ];
    });

    React.useEffect(() => {
        localStorage.setItem("complaints", JSON.stringify(complaints));
    }, [complaints]);



    const handleDismiss = (id) => {
        setComplaints((prev) => prev.filter((complaint) => complaint.id !== id));
    };


    const handleInProgress = (id) => {
        setComplaints((prev) =>
            prev.map((complaint) =>
                complaint.id === id
                    ? { ...complaint, status: 'inProgress' }
                    : complaint
            )
        );
    };


    return (
        <div>
            <div className="admin-toolbar">
                <img src="/Rahal_Logo.png" alt="Logo" className="toolbar-logo" />
                <span className="logout-text">Logout</span>
            </div>

            <div className="search-filter-bar">
                <div className="search-group">
                    <label htmlFor="search">Search</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search complaints..."
                        className="search-input"
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="filter">Filter</label>
                    <select id="filter" className="filter-dropdown">
                        <option value="">All</option>
                        <option value="latest">Latest</option>
                        <option value="name">Name A-Z</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <div className="apply-group">
                    <button className="btn btn-filled">Apply</button>
                </div>
            </div>



            <div className="page-center">
                {complaints.map((complaint) => (
                    <div className={`item-box ${complaint.status === 'inProgress' ? 'in-progress' : ''}`} key={complaint.id}>

                    <div className="item-content">
                            <div className="item-info">
                                <h4 className="item-title">{complaint.issuedBy}</h4>
                                <p className="item-date">{complaint.date}</p>
                                <p className="item-sub">{complaint.description}</p>
                            </div>
                        </div>

                        <div className="item-buttons">
                            <div
                                key={complaint.id}
                                className={`complaint-card ${complaint.status === 'inProgress' ? 'in-progress' : ''}`}
                            >
                                {/* complaint content */}
                                <button
                                    className="btn btn-outline"
                                    onClick={() => handleInProgress(complaint.id)}
                                    disabled={complaint.status === 'inProgress'}
                                >
                                    {complaint.status === 'inProgress' ? 'handling' : 'Mark In Progress'}
                                </button>

                            </div>


                            <button
                                className="btn btn-filled"
                                onClick={() => navigate('/review', { state: { id: complaint.id } })}
                            >
                                Resolve
                            </button>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Complaints;
