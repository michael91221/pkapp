'use server';

import Pusher from 'pusher';

const pusher = new Pusher({
    appId: '1993202',
    key: 'd829044e9ea58f9d4a19',
    secret: '4915b6e56116aa9c9bb3', // keep on server only!
    cluster: 'us2',
    useTLS: true,
});

export async function triggerPusherEvent(data: any) {
    try {
        await pusher.trigger('my-channel', 'my-event', {
            event: 'ParkingContextUpdated',
            payload: data,
        });
    } catch (err: any) {
        console.error('[Pusher Trigger Error]', err);
    }
}
