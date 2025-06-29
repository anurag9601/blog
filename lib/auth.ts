import { prismaClient } from "@/db/prismaClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        GitHub,
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    type: "text"
                },
                fullName: {
                    type: "text"
                },
                password: {
                    type: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) return null;

                let user = await prismaClient.user.findUnique({ where: { email: credentials.email as string } });

                if (user) {
                    const validPassword = await bcrypt.compare(credentials.password as string, user.password);

                    if (!validPassword) return null;
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword: string = await bcrypt.hash(credentials.password as string, salt);

                    user = await prismaClient.user.create({
                        data: {
                            email: credentials.email as string,
                            password: hashedPassword,
                            fullName: credentials.fullName as string
                        }
                    });
                }
                return {
                    id: user.id.toString(),
                    name: user.fullName,
                    email: user.email,
                };
            }
        })
    ]
    ,
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.name as string;
                session.user.name = token.email as string;
            };

            return session;
        }
    }
})