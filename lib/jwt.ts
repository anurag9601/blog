import jwt from "jsonwebtoken";

interface AuthTokenPayload {
    email: string,
    name: string
}

const JWT_SECRET = process.env.AUTH_SECRET as string;

export function verifyToken(token: string): AuthTokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    } catch (error) {
        return null;
    }
}