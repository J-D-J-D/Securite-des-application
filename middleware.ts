import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, SUPABASE_JWT_SECRET);
    return NextResponse.next();
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ["/posts/:path*", "/protected/:path*"] };
