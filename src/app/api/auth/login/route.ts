import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma'; // Ajusta la ruta a tu prisma client

const JWT_SECRET = process.env.JWT_SECRET || 'secret'; // Usa una variable de entorno
const JWT_EXPIRES_IN = '15m'; // Expiración del JWT

// Función para el login
export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Buscar usuario en la base de datos
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.password !== password) {
            return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
        }

        // Crear JWT (access token)
        const accessToken = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        // Crear refresh token (opcional, si lo deseas)
        const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '7d',
        });

        // Establecer cookies con los tokens
        const response = NextResponse.json({ message: 'Login exitoso' });
        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60, // 15 minutos
        });
        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 días
        });

        return response;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ message: 'Ocurrió un error al procesar el login' }, { status: 500 });
    }
}
