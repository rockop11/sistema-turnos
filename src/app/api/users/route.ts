import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password, // Considera hashear la contraseña con bcrypt.
            },
        });

        return NextResponse.json(newUser);
    } catch (error) {
        return NextResponse.json({ error: 'Email ya registrado.' }, { status: 400 });
    }
}
