'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParking } from '../context/ParkingContext';

export default function VerifyPhonePage() {
    const { data, setData } = useParking();
    const router = useRouter();

    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [idle, setIdle] = useState(false);

    useEffect(() => {
        const idleTimer = setTimeout(() => {
            setIdle(true);
        }, 10000); // 10 seconds of inactivity before showing spinner

        return () => clearTimeout(idleTimer);
    }, [code]);

    const maskedPhone = data.phoneNumber
        ? data.phoneNumber.replace(/.(?=.{4})/g, '*')
        : '***';

    const handleVerify = () => {
        if (code.trim().length < 4) {
            setError('Please enter the full verification code.');
            return;
        }

        setError('');
        setData({ verificationCode: code.trim() }); // ✅ Save it
        router.push('/thank-you');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8">
            <h1 className="text-xl font-semibold mb-4">Verify Your Phone Number</h1>
            <p className="text-gray-600 mb-6">
                Enter the code sent to <strong>{maskedPhone}</strong>
            </p>

            <input
                type="text"
                value={code}
                onChange={(e) => {
                    setCode(e.target.value);
                    setIdle(false); // reset idle when typing
                }}
                className="w-full max-w-xs border p-2 rounded mb-4"
                placeholder="Enter verification code"
            />
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <button
                onClick={handleVerify}
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
            >
                Verify
            </button>

            {idle && (
                <div className="mt-6 flex flex-col items-center text-sm text-gray-500">
                    <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-green-600 rounded-full mb-2" />
                    Waiting for input…
                </div>
            )}
        </div>
    );
}
