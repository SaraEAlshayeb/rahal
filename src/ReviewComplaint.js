import React from 'react';
import './ReviewComplaint.css';
import { useNavigate } from 'react-router-dom';

function ReviewComplaint() {
    const navigate = useNavigate();

    return (
        <div className="review-page">
            <div className="box-left">
                <div>
                    <h2>Complaint Description</h2>
                    <br/><br/>

                    <div className="description-box">
                        <p>
                            Driver arrived 20 minutes late to the scheduled pickup, causing a significant delay
                            and missing an important appointment.
                        </p>
                    </div>
                </div>

                <div className="buttons-bottom">
                    <button className="btn btn-filled">Resolved</button>
                    <button className="btn btn-outline" onClick={() => navigate('/complaints')}>
                        Back to Complaints
                    </button>

                </div>
            </div>


            <div className="box-right">
                <h2>Contact Info</h2>
                <br/><br/>
                <p><strong>Email:</strong> rider@email.com</p>
                <p><strong>Phone:</strong> +966 50 123 4567</p>
                <p><strong>Ride ID:</strong> #RIDE2345</p>
                <p><strong>Driver Name:</strong> Ahmed Alotaibi</p>
            </div>
        </div>


    );
}

export default ReviewComplaint;
