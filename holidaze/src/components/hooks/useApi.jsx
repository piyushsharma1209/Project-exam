import { useState } from 'react';
import { venuesUrl } from '../constants/constantsUrl';

export const useApi = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchVenues = async () => {
        setLoading(true);
        try {
            const response = await fetch(venuesUrl);
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    const fetchProfileData = async () => {
        try {
            const response = await fetch(profileUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setProfileData(data);
        } catch (error) {
            console.error("Failed to fetch profile data:", error);
        }
    };



    return { data, error, loading, fetchVenues, fetchProfileData };
}
