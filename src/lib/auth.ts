import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export function verifyToken(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}
