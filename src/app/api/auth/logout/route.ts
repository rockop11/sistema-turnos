import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();

    (await cookieStore).delete('accessToken');
    (await cookieStore).delete('refreshToken');
    
    return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL));
}