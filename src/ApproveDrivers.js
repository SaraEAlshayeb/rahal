import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ApproveDrivers() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [sortOption, setSortOption] = useState('All');

    useEffect(() => {
        fetch('http://localhost:5000/approve/pending')
            .then(res => res.json())
            .then(data => {
                setRequests(data);
                setFiltered(data);
            })
            .catch(err => console.error("Error fetching driver requests:", err));
    }, []);

    const applyFilters = () => {
        let results = [...requests];

        // 🔍 Filter by search
        if (searchText.trim()) {
            results = results.filter((user) =>
                user.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // 🔃 Sort by selected option
        switch (sortOption) {
            case 'Latest':
                results.sort((a, b) => new Date(b._id) - new Date(a._id));
                break;
            case 'Oldest':
                results.sort((a, b) => new Date(a._id) - new Date(b._id));
                break;
            case 'Name A-Z':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFiltered(results);
    };

    return (
        <div>
            <div className="search-filter-bar">
                <div className="search-group">
                    <label htmlFor="search">Search</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by name..."
                        className="search-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="filter">Filter</label>
                    <select
                        id="filter"
                        className="filter-dropdown"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Latest">Latest</option>
                        <option value="Name A-Z">Name A-Z</option>
                        <option value="Oldest">Oldest</option>
                    </select>
                </div>
                <div className="apply-group">
                    <button className="btn btn-filled" onClick={applyFilters}>
                        Apply
                    </button>
                </div>
            </div>

            <div className="page-center">
                {filtered.map((user) => (
                    <div className="item-box" key={user._id}>
                        <div className="item-content">
                            <div className="item-info">
                                <p>
                                    <strong>{user.name}</strong>
                                    <span style={{ fontWeight: "normal" }}> has requested to be a driver!</span>
                                </p>
                            </div>
                        </div>
                        <div className="item-buttons">
                            <button
                                className="btn btn-filled"
                                onClick={() => navigate('/review-driver', { state: { userId: user._id } })}
                            >
                                Review
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApproveDrivers;
