import { NextResponse, NextRequest } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;
  const session = getSessionFromCookie();

  if (!session || !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/posts/:path*", "/protected/:path*"],
};
