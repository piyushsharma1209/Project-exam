import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/success.css';


function SuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingDetails = location.state ? location.state.details : null;

    return (
        <div className="success-container">
            <h2>Booking Successful!</h2>
            {bookingDetails && (
                <div className="booking-details">
                    <h3>Booking Details:</h3>
                    <p><strong>Venue:</strong> {bookingDetails.venueName}</p>
                    <p><strong>Check-In Date:</strong> {new Date(bookingDetails.dateFrom).toDateString()}</p>
                    <p><strong>Check-Out Date:</strong> {new Date(bookingDetails.dateTo).toDateString()}</p>
                    <p><strong>Total Amount:</strong> {bookingDetails.totalAmount}</p>
                    <p><strong>Number of Guests:</strong> {bookingDetails.guests}</p>
                </div>
            )}
            <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
}

export default SuccessPage;
