import { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("authjs.session-token")?.value;

    const verifiedUser = verifyToken(token as string);

    console.log("verifiedUser", verifiedUser);

    const authURL = "/auth";
    const protectedURL = ["/create-blog"];

    const pathName = req.nextUrl.pathname;

    console.log("pathName", pathName);
}
