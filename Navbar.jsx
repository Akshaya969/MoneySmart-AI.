import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function Navbar(){
  const [user, setUser] = useState(null)
  const nav = useNavigate()

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u=> setUser(u))
    return ()=> unsub()
  },[])

  async function logout(){ await signOut(auth); nav('/') }

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-blue-400 font-bold text-xl">$ MoneySmart</div>
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/chat" className="hover:underline">AI Advisor</Link>
          <Link to="/feedback" className="hover:underline">Feedback</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">MoneySmart – Your AI Finance Buddy!</div>
          {user ? (
            <>
              <button onClick={logout} className="bg-gray-700 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 px-3 py-1 rounded">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
