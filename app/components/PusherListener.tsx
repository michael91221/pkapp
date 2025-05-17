// components/PusherListener.tsx
'use client';

import { useEffect } from 'react';
import Pusher from 'pusher-js';

const PusherListener = () => {
    useEffect(() => {
        // This key comes from your Pusher dashboard (not the secret one!)
        const pusher = new Pusher('d829044e9ea58f9d4a19', {
            cluster: 'us2',
        });

        const channel = pusher.subscribe('my-channel');

        channel.bind('my-event', function (data: any) {
            console.log('[Pusher Event Received]', data);
            // You can handle the message here (e.g., toast, update UI, etc.)
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, []);

    return null; // Just a listener component
};

export default PusherListener;
