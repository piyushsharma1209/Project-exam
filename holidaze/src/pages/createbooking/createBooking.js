import { bookingUrl } from "../../components/constants/constantsUrl";

export async function CreateBooking(bookingData) {
    const method = 'post';
    const token = localStorage.getItem('token');
    const createBookingUrl = `${bookingUrl}`;

    try {
        const response = await fetch(createBookingUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
        });

        const bookingResult = await response.json();

        if (response.ok) {
            return bookingResult;
        } else {
            console.error('Error creating booking:', bookingResult);
            return null;
        }
    } catch (error) {
        console.error('Exception while creating booking:', error);
        return null;
    }
}
