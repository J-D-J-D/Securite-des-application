'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    // --- Validation ---
    if (!emailRegex.test(email)) {
      setErrorMsg('Email invalide')
      return
    }
    if (!passwordRegex.test(password)) {
      setErrorMsg('Mot de passe invalide. Minimum 12 caractères avec majuscules, minuscules, chiffres et caractères spéciaux.')
      return
    }
    if (!username.trim()) {
      setErrorMsg('Nom d’utilisateur requis')
      return
    }

    setLoading(true)

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password
      })

      if (signupError) {
        setErrorMsg(signupError.message)
        setLoading(false)
        return
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, username, full_name: username }])

        if (profileError) {
          setErrorMsg('Erreur création profil : ' + profileError.message)
          setLoading(false)
          return
        }
      }

      alert('Compte créé ! Vérifie ton email pour confirmer l’inscription.')
      setEmail('')
      setPassword('')
      setUsername('')

    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-2 w-80">
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
      <input
        type="text"
        placeholder="Nom d’utilisateur"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="border p-2 rounded"
      />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded">
        {loading ? 'Création...' : 'Créer un compte'}
      </button>
    </form>
  )
}
