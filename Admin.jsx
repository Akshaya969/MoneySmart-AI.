import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

export default function Admin(){
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(()=>{
    (async ()=>{
      const q = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setFeedbacks(snap.docs.map(d=>({id:d.id, ...d.data()})))
    })()
  },[])

  const avg = feedbacks.length ? (feedbacks.reduce((s,f)=>s+ (f.rating||0),0)/feedbacks.length).toFixed(1) : 'N/A'

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded">Total Feedback: {feedbacks.length}</div>
        <div className="bg-gray-800 p-4 rounded">Avg Rating: {avg}</div>
        <div className="bg-gray-800 p-4 rounded">Active Users: N/A</div>
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h3 className="font-semibold mb-2">Feedback</h3>
        <ul>
          {feedbacks.map(f=> (
            <li key={f.id} className="border-b border-gray-700 py-2">
              <div className="text-sm text-gray-300">{f.text}</div>
              <div className="text-xs text-gray-500">{f.email} — {f.rating}★</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
