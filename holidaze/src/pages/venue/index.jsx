import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { venuesUrl, bookingUrl } from '../../components/constants/constantsUrl';
import { useAuth } from '../../context/AuthContext';
import { CreateBooking } from '../createbooking/createBooking';
import '../../styles/venue.css';

function VenuePage() {
    const { isAuthenticated, token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const [venue, setVenue] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [guests, setGuests] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVenueData = async () => {
            try {
                const response = await fetch(`${venuesUrl}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setVenue(data);
                setBookedDates(data.bookedDates || []);
            } catch (err) {
                setError("Error fetching venue data");
            }
        };
        fetchVenueData();
    }, [id, token]);

    const handleDateChange = date => {
        setSelectedDate(date);
        if (!checkInDate || (checkInDate && checkOutDate)) {
            setCheckInDate(date);
            setCheckOutDate(null);
        } else if (date > checkInDate) {
            setCheckOutDate(date);
            const daysDifference = (date - checkInDate) / (1000 * 3600 * 24);
            setTotalAmount(daysDifference * venue.price);
        } else {
            setCheckInDate(date);
            setCheckOutDate(null);
        }

    };

    const handleBooking = async () => {
        if (!checkInDate || !checkOutDate) {
            setError("Please select both check-in and check-out dates.");
            return;
        }

        if (guests < 1 || guests > 10) {
            setError("Invalid number of guests.");
            return;
        }

        const bookingData = {
            venueId: venue.id,
            dateFrom: checkInDate.toISOString().split('T')[0],
            dateTo: checkOutDate.toISOString().split('T')[0],
            totalAmount,
            guests
        };

        try {
            const response = await fetch(bookingUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) {
                throw new Error("Booking failed.");
            }
            console.log("Navigating with bookingData:", bookingData);

            navigate('/success', {
                state: {
                    details: {
                        ...bookingData,
                        venueName: venue.name
                    }
                }
            });

        } catch (err) {
            setError("Error making the booking.");
        }
    };

    return (
        <div className="venue-container">
            {venue && (
                <div className="venue-content">
                    <div className="venue-details">
                        <h1>{venue.name}</h1>
                        <p>{venue.description}</p>
                        <div className="venue-calendar">
                            <h2>Select Check-In and Check-Out Dates:</h2>
                            <Calendar
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                            <div className="date-display">
                                <div className="date-label">Check-In Date:</div>
                                <div className="date-value">{checkInDate ? checkInDate.toDateString() : "Not selected"}</div>
                            </div>
                            <div className="date-display">
                                <div className="date-label">Check-Out Date:</div>
                                <div className="date-value">{checkOutDate ? checkOutDate.toDateString() : "Not selected"}</div>
                            </div>
                            {totalAmount > 0 && (
                                <div className="total-price">Total Amount: {venue.currencySymbol || '$'} {totalAmount}</div>
                            )}
                            <div className="guests-input">
                                <label>Number of Guests:</label>
                                <input
                                    type="number"
                                    value={guests}
                                    onChange={e => setGuests(Number(e.target.value))}
                                    min="1"
                                    max="10"
                                    className="guest-input-field"
                                />
                            </div>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <div className="booked-dates">
                            <h3>Booked Dates:</h3>
                            {bookedDates.map((date) => (
                                <div key={date.id}>{date.date}</div>
                            ))}
                        </div>
                    </div>
                    {isAuthenticated && (
                        <button onClick={handleBooking}>Book Now</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default VenuePage;
