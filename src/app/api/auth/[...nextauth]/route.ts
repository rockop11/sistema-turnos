import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user) {
                    return null;
                }

                if (user.password && user.password !== credentials?.password) {
                    return null;
                }

                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    callbacks: {
        async signIn({ user }) {

            if (!user.email) {
                throw new Error('Email is required for Google login');
            }

            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (!existingUser) {

                await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name || "Nuevo Usuario",
                        password: "",
                        role: "CLIENT",
                    },
                });
            }

            return true
        },
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as string,
                accessToken: token.accessToken as string,
            };
            return session;
        },
        async redirect({ baseUrl }) {
            return baseUrl
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
