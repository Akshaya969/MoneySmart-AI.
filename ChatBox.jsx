import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

export default function ChatBox(){
  const [messages, setMessages] = useState([{ from: 'ai', text: "Hello! I'm your AI financial advisor. Ask me anything about personal finance." }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef()

  useEffect(()=>{
    if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  },[messages])

  async function send(){
    if(!input) return
    const userMsg = { from: 'user', text: input }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)
    try{
      const res = await axios.post('/api/openai-proxy', { message: userMsg.text })
      const aiText = res.data.reply
      setMessages(m => [...m, { from: 'ai', text: aiText }])
    }catch(e){
      setMessages(m => [...m, { from: 'ai', text: 'Sorry, something went wrong.' }])
    }finally{ setLoading(false) }
  }

  return (
    <div className="bg-gray-800 rounded p-4">
      <div className="h-64 overflow-y-auto mb-4" ref={listRef}>
        {messages.map((m,i) => (
          <div key={i} className={m.from === 'ai' ? 'text-left text-gray-200 mb-2' : 'text-right text-gray-100 mb-2'}>
            <div className="inline-block p-2 rounded" style={{background: m.from==='ai'? '#111827':'#1f2937'}}>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask a financial question..." className="flex-1 bg-gray-900 p-2 rounded" />
        <button onClick={send} className="bg-blue-600 px-4 rounded" disabled={loading}>{loading? '...':'Send'}</button>
      </div>
    </div>
  )
}
