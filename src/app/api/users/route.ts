import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // console.error("Error al obtener usuarios:", error);
        return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
    }
}