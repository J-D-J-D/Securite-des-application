import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data, error } = await supabaseServer.auth.signInWithPassword({
    email,
    password
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });

  const accessToken = data.session?.access_token;

  const res = NextResponse.json({ user: data.user });

  res.cookies.set("sb-access-token", accessToken!, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 15,
    path: "/"
  });

  return res;
}
