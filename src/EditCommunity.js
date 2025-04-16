import React from 'react';
import { useLocation } from 'react-router-dom';

function EditCommunity() {
    const { state: community } = useLocation();

    return (
        <div style={{ padding: '20px' }}>
            <h2>Edit Community: {community.name}</h2>
            <img src={community.img} alt={community.name} width={100} />
            <p><strong>Name:</strong> {community.name}</p>
            <p><strong>Description:</strong> A place for {community.name} students and alumni to connect...</p>
        </div>
    );
}

export default EditCommunity;
