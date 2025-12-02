'use client'

import { useState } from 'react'
import AuthForm from './AuthForm'
import LoginForm from './LoginForm'
import UserProfile from './UserProfile'

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? 'Créer un compte' : 'Se connecter'}
        </h1>

        {isSignup ? <AuthForm /> : <LoginForm />}

        <div className="mt-4 text-center text-sm">
          {isSignup ? (
            <>
              Déjà un compte ?{' '}
              <button
                onClick={() => setIsSignup(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Connexion
              </button>
            </>
          ) : (
            <>
              Pas encore de compte ?{' '}
              <button
                onClick={() => setIsSignup(true)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Inscription
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
