'use client';

import { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { useRouter } from 'next/navigation';

import {
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaCcDiscover,
    FaCreditCard,
} from 'react-icons/fa';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function PaymentPage() {
    const { data, setData } = useParking();
    const [cardNumber, setCardNumber] = useState(data.cardNumber || '');
    const [expDate, setExpDate] = useState(data.expDate || '');
    const [cvv, setCvv] = useState(data.cvv || '');
    const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || '');
    const [billingAddress, setBillingAddress] = useState(data.billingAddress || '');
    const [cardType, setCardType] = useState<'credit' | 'debit'>(data.cardType || 'debit');
    const [pin, setPin] = useState(data.pin || '');

    const router = useRouter();

    const handleAddCard = () => {
        setData({
            cardNumber,
            expDate,
            cvv,
            phoneNumber,
            billingAddress,
            cardType,
            pin: cardType === 'debit' ? pin : '', // only store PIN for debit
        });

        router.push('/processing');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
            <div className="text-sm text-gray-600 mb-4">
                <Breadcrumbs />
            </div>

            <h1 className="text-xl font-bold mb-6">Add your payment method</h1>

            <div className="text-left mb-6 space-y-1 text-sm">
                <p>⏳ <strong>Time:</strong> {data.hours}h {data.minutes}m</p>
                <p>💳 <strong>Amount to pay:</strong> {data.price} EUR</p>
                <p>📛 <strong>License Number:</strong> {data.licensePlate}</p>
            </div>

            <div className="w-full max-w-md bg-white p-6 rounded shadow">
                <div className="flex justify-center mb-4 gap-4 text-3xl text-gray-700">
                    <FaCcVisa />
                    <FaCcMastercard />
                    <FaCcAmex />
                    <FaCcDiscover />
                    <FaCreditCard />
                </div>

                {/* Card type toggle */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-semibold">Card Type</label>
                    <div className="flex gap-2">
                        {['debit', 'credit'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setCardType(type as 'debit' | 'credit')}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
                    ${cardType === type
                                        ? 'bg-green-700 text-white border-green-700'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>


                <label className="block mb-1 font-semibold text-sm">Card Number</label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                    placeholder="**** **** **** ****"
                />

                <div className="flex gap-2 mb-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-semibold text-sm">Exp date</label>
                        <input
                            type="text"
                            value={expDate}
                            onChange={(e) => setExpDate(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-semibold text-sm">CVV</label>
                        <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="***"
                        />
                    </div>
                </div>

                {/* Conditional PIN input */}
                {cardType === 'debit' && (
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold text-sm">PIN</label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="****"
                        />
                    </div>
                )}

                <label className="block mb-1 font-semibold text-sm">Phone Number</label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                    placeholder="+1 (555) 123-4567"
                />

                <label className="block mb-1 font-semibold text-sm">Billing Address</label>
                <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="w-full border p-2 rounded mb-6"
                    placeholder="123 Main St, City, ZIP"
                />

                <button
                    onClick={handleAddCard}
                    className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
                >
                    Add Card
                </button>
            </div>
        </div>
    );
}
