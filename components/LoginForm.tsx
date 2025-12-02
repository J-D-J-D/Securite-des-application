'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMsg('Email invalide')
      return
    }
    if (!password) {
      setErrorMsg('Mot de passe requis')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setErrorMsg('Erreur de connexion : ' + error.message)
        setLoading(false)
        return
      }

      alert('Connexion réussie !')
      setEmail('')
      setPassword('')

    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 w-80">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <button type="submit" disabled={loading} className="bg-green-600 text-white p-2 rounded">
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  )
}