// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY! // côté serveur seulement

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false }
})

export async function POST(req: Request) {
  const body = await req.json()
  const { author, title, content } = body

  // validation basique
  if (!author || !title) return NextResponse.json({ error: 'Missing' }, { status: 400 })

  const { data, error } = await supabase
    .from('posts')
    .insert([{ author, title, content }])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
