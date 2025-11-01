import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      await signInWithEmailAndPassword(auth, email, password)
      nav('/admin')
    }catch(er){
      setErr(er.message)
    }
  }

  return (
    <div className="container mx-auto max-w-md bg-gray-800 p-6 rounded">
      <h3 className="text-xl mb-4">Login</h3>
      <form onSubmit={submit}>
        <input className="w-full p-2 bg-gray-900 rounded mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-full p-2 bg-gray-900 rounded mb-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="bg-blue-600 px-4 py-2 rounded">Login</button>
        {err && <div className="mt-2 text-red-400">{err}</div>}
      </form>
    </div>
  )
}
