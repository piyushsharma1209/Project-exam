import React, { useState, useEffect } from 'react';
import { venuesUrl } from '../../components/constants/constantsUrl';
import '../../styles/home.css';

function Home() {
    const [venues, setVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState('');
    const [subtitle, setSubtitle] = useState('Meetings & margaritas');

    const subtitles = [
        'Meetings & margaritas',
        'Brainstorms & burgers',
        'Workshops & wine',
        'Presentations & pizza',
        'Conferences & cocktails'
    ];

    useEffect(() => {
        fetch(venuesUrl)
            .then(response => response.json())
            .then(data => setVenues(data))
            .catch(error => console.error('Error fetching venues:', error));

        const interval = setInterval(() => {
            setSubtitle(prevSubtitle => {
                const nextIndex = (subtitles.indexOf(prevSubtitle) + 1) % subtitles.length;
                return subtitles[nextIndex];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="home-banner">
            <div className="overlay">
                <h1 className="title">Find the Perfect Space for</h1>
                <h2 className="subtitle">{subtitle}</h2>
                <div className="search-container">
                    <input
                        type="text"
                        list="venues"
                        placeholder="Search or Select a Venue..."
                        value={selectedVenue}
                        onChange={(e) => setSelectedVenue(e.target.value)}
                        className="search-input"
                    />
                    <datalist id="venues">
                        {venues.map(venue => (
                            <option key={venue.id} value={venue.name}>
                                {venue.name}
                            </option>
                        ))}
                    </datalist>
                    <button
                        className="continue-button"
                        onClick={() => {
                            const venue = venues.find(venue => venue.name === selectedVenue);
                            if (venue) {
                                window.location.href = `/venue/${venue.id}`;
                            }
                        }}
                    >
                        Continue Booking
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
