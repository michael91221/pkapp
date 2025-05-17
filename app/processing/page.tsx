'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParking } from '../context/ParkingContext';

export default function ProcessingPage() {
    const router = useRouter();
    const { data } = useParking();

    useEffect(() => {
        console.log('Final Parking Data:', data);
    }, [data]);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/verify');
        }, 20000);
        return () => clearTimeout(timer);
    }, [router]);


    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-6" />
            <h1 className="text-xl font-semibold mb-2">Processing your information...</h1>
            <p className="text-gray-600 max-w-md">
                We're finalizing your parking details and securing your payment.
                This will only take a few moments. Thank you for your patience!
            </p>
        </div>
    );
}
