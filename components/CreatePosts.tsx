'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const getUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return setUserRole(null)

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Erreur récupération rôle:', error)
      } else {
        setUserRole(data?.role ?? null)
      }
    }

    getUserRole()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return setErrorMsg('Le titre est obligatoire.')

    setLoading(true)
    setErrorMsg(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || userRole !== 'user') {
      setErrorMsg("Vous n'êtes pas autorisé à créer un post.")
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('posts')
      .insert([{
        author: user.id,
        title,
        content,
        published: true
      }])

    if (error) {
      setErrorMsg(error.message)
    } else {
      setTitle('')
      setContent('')
      setErrorMsg(null)
    }

    setLoading(false)
  }

  if (userRole !== 'user') {
    return <p>Seuls les utilisateurs avec le rôle "user" peuvent créer des posts.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <textarea
        placeholder="Contenu"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
      />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Création...' : 'Créer le post'}
      </button>
    </form>
  )
}
