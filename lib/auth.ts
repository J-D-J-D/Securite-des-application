import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET!;
const SESSION_TIMEOUT = 15 * 60;

export async function getSessionFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value; 
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
    return decoded;
  } catch (e) {
    return null;
  }
}
