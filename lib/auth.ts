import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prismaClient } from "@/db/prismaClient";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
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
    ],
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
})