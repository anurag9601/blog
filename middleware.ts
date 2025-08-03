import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { rootDomain } from "./lib/utils";

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

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
