import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export default function FeedbackForm(){
  const [rating, setRating] = useState(5)
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [status, setStatus] = useState(null)

  async function submit(e){
    e.preventDefault()
    try{
      await addDoc(collection(db, 'feedback'), {
        rating, email, text, createdAt: serverTimestamp()
      })
      setStatus('submitted')
    }catch(err){
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="bg-gray-800 p-4 rounded">
      <label className="block">Rating</label>
      <input type="range" min="1" max="5" value={rating} onChange={e=>setRating(Number(e.target.value))} />
      <label className="block mt-2">Email (optional)</label>
      <input className="w-full p-2 bg-gray-900 rounded" value={email} onChange={e=>setEmail(e.target.value)} />
      <label className="block mt-2">Feedback</label>
      <textarea className="w-full p-2 bg-gray-900 rounded" value={text} onChange={e=>setText(e.target.value)} />
      <button className="mt-3 bg-blue-600 px-4 py-2 rounded" type="submit">Submit Feedback</button>
      {status === 'submitted' && <div className="mt-2 text-green-400">Thanks!</div>}
    </form>
  )
}
