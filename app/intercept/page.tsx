'use client';

import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { ClipboardCopy } from 'lucide-react'; // optional icon

export default function InterceptPage() {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('d829044e9ea58f9d4a19', {
            cluster: 'us2',
        });

        const channel = pusher.subscribe('parking-channel');
        channel.bind('parking-update', (data: any) => {
            console.log('Received:', data);
            setMessages(prev => [data, ...prev]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, []);

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const handleCopyJSON = (msg: any) => {
        navigator.clipboard.writeText(JSON.stringify(msg, null, 2));
    };

    return (
        <div className="p-4 space-y-6 max-w-3xl mx-auto">
            <h1 className="text-xl font-bold">🔔 Intercepted Updates</h1>

            {messages.map((msg, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white shadow space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-gray-700">Message #{index + 1}</h2>
                        <button
                            onClick={() => handleCopyJSON(msg)}
                            className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                            Copy JSON
                        </button>
                    </div>

                    <div className="space-y-3">
                        {Object.entries(msg).map(([key, value], i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="w-32 text-sm font-medium text-gray-600">{key}</label>
                                <input
                                    type="text"
                                    value={String(value)}
                                    readOnly
                                    className="flex-1 px-2 py-1 border rounded text-sm bg-gray-50"
                                />
                                <button
                                    onClick={() => handleCopyText(String(value))}
                                    className="text-sm px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                >
                                    Copy
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
