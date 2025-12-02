'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Post = {
  id: string
  title: string
  content: string | null
  created_at: string
  profiles: {
    username: string | null
  } | null
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, content, created_at, profiles(username)')
        .eq('published', true)
        .order('created_at', { ascending: false })as {
        data: Post[] | null
        error: any
        }

      if (error) {
        console.error('Erreur fetch posts:', error)
      } else {
        setPosts(data ?? [])
      }
      setLoading(false)
    }

    fetchPosts()

    const subscription = supabase
      .channel('posts-ch')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        () => fetchPosts()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  if (loading) return <p>Chargement...</p>
  if (posts.length === 0) return <p>Aucun post publié pour le moment.</p>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="mb-4 border-b pb-2">
          <h3 className="font-bold">{post.title}</h3>
          <p>{post.content}</p>
          <small>
            Posté par <strong>{post.profiles?.username ?? "Utilisateur"}</strong><br />
            le {new Date(post.created_at).toLocaleString()}
          </small>
        </li>
      ))}
    </ul>
  )
}
