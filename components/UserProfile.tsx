'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Profile = {
  id: string
  username: string
  full_name: string
  avatar_url?: string
}

export default function UserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      setProfile(data)
    }

    fetchProfile()
  }, [])

  if (!profile) return <p>Chargement...</p>

  const handleLogout = async () => {
  await supabase.auth.signOut()
}


  return (
    <div className="border p-4 rounded w-80">
      <h2>Profil</h2>
      <p><strong>Nom d’utilisateur :</strong> {profile.username}</p>
      {profile.avatar_url && <img src={profile.avatar_url} alt="avatar" className="w-20 h-20 rounded-full mt-2" />}
      <button onClick={handleLogout}className="bg-red-500 text-white p-2 rounded mt-2">Déconnexion</button>
    </div>
  )
}
