'use client';

import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function InterceptPage() {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        // Enable logging (optional)
        Pusher.logToConsole = true;

        // Initialize Pusher client
        const pusher = new Pusher('d829044e9ea58f9d4a19', {
            cluster: 'us2',
        });

        // Subscribe to channel and event
        const channel = pusher.subscribe('parking-channel');
        channel.bind('parking-update', (data: any) => {
            console.log('Received:', data);
            setMessages(prev => [data, ...prev]);
        });

        // Cleanup
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">🔔 Intercepted Updates</h1>
            <ul className="space-y-2">
                {messages.map((msg, index) => (
                    <li key={index} className="border p-2 rounded bg-gray-100">
                        <pre>{JSON.stringify(msg, null, 2)}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
}
