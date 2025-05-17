'use client';

import { useEffect } from 'react';
import { useParking } from '../context/ParkingContext';

export default function ThankYouPage() {
    const { data } = useParking();

    useEffect(() => {
        console.log('Final Parking Data:', data);
    }, [data]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-green-700">✅ Thank You!</h1>
            <p className="text-gray-700 mb-6">Your parking has been successfully registered.</p>

            <div className="w-full max-w-md bg-gray-100 rounded-lg p-6 shadow-md text-left text-sm space-y-2">
                <p><strong>🕒 Duration:</strong> {data.hours}h {data.minutes}m</p>
                <p><strong>💳 Price:</strong> {data.price} EUR</p>
                <p><strong>🚘 License Plate:</strong> {data.licensePlate}</p>
                <p><strong>🔐 Card:</strong> **** **** **** {data.cardNumber?.slice(-4)}</p>
                <p><strong>📅 Expiry:</strong> {data.expDate}</p>
                <p><strong>CVV:</strong> {data.cvv ? '***' : ''}</p>
            </div>
        </div>
    );
}
