import React from 'react'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }){
  const [user, loading] = useAuthState ? useAuthState(auth) : [auth.currentUser, false]
  if(loading) return <div>Loading...</div>
  if(!user) return <Navigate to="/login" replace />
  return children
}
