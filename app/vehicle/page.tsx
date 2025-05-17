'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParking } from '../context/ParkingContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function VehiclePage() {
    const { data, setData } = useParking();
    const [plate, setPlate] = useState(data.licensePlate || '');
    const router = useRouter();

    const handleContinue = () => {
        setData({ licensePlate: plate });
        router.push('/payment'); // or next step
    };

    useEffect(() => {
        console.log('Parking Context Data:', data);
    }, [data]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <div className="text-sm text-gray-600 mb-4">
                <Breadcrumbs />
            </div>

            <h1 className="text-xl font-bold mb-4">Add your license plate</h1>

            <div className="w-full max-w-md">
                <label className="block text-left mb-1 font-semibold">License plate No.</label>
                <input
                    type="text"
                    placeholder="License plate No."
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    className="w-full border rounded p-2 mb-4"
                />
                <button
                    onClick={handleContinue}
                    className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
