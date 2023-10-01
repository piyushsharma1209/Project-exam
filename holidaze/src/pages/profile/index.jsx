import React, { useState, useEffect } from 'react';
import '../../styles/profile.css';
import { useAuth } from '../../context/AuthContext';
import { profileUrl } from '../../components/constants/constantsUrl';

function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        if (!user) return;
        const userProfileUrl = profileUrl.endsWith('/') ? profileUrl.slice(0, -1) : profileUrl;
        const userProfileUrlWithUsername = `${userProfileUrl}/${user.name}`;
        fetch(userProfileUrlWithUsername, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
            });

        const userBookingsUrl = `${profileUrl}${user.name}/bookings`;
        fetch(userBookingsUrl, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
            });
    }, [user]);

    if (!user) return <div>Please log in to view your profile.</div>;

    return (
        <div className="profile-container">
            <div className="user-details">
                <h2>User Details</h2>
                <p><strong>Name:</strong> {profile ? profile.name : 'Loading...'}</p>
                <p><strong>Email:</strong> {profile ? profile.email : 'Loading...'}</p>
            </div>
            <div className="customer-section">
                <h2>Your Bookings</h2>
                {!bookings ? (
                    <p>Loading bookings...</p>
                ) : (
                    bookings.length === 0 ? (
                        <p>No bookings found.</p>
                    ) : (
                        <ul>
                            {bookings.map((booking) => (
                                <li key={booking.id}>
                                    <p><strong>Venue:</strong> {booking.venueName}</p>
                                    <p><strong>Date From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                                    <p><strong>Date To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
        </div>
    );
}

export default Profile;
