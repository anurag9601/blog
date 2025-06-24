import { NextRequest } from "next/server";

export function middleware(req:NextRequest){
    const protectedRoutes = [];
    const authRoutes = ["/signin", "/signup"];

    const pathName = req.nextUrl.pathname;
    
}