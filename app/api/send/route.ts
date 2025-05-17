import { NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
    appId: "1993202",
    key: "d829044e9ea58f9d4a19",
    secret: "4915b6e56116aa9c9bb3",
    cluster: "us2",
    useTLS: true
});


export async function POST(req: Request) {
    const body = await req.json();

    await pusher.trigger('parking-channel', 'parking-update', body);

    return NextResponse.json({ success: true });
}
