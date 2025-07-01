import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const session = await getToken({ req, secret: process.env.AUTH_SECRET });

    const authURL = "/auth";
    const protectedURLs = ["/create-blog"];

    const pathName = req.nextUrl.pathname;

    if (!session && protectedURLs.includes(pathName)) {
        return NextResponse.redirect(new URL("/auth", req.url));
    };

    if (session && session.email && pathName === authURL) {
        return NextResponse.redirect(new URL("/", req.url));
    };

    return NextResponse.next();
};

export const config = {
    matcher: ["/dashboard/:path*", "/create-blog", "/auth"],
};
