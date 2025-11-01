import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Advisor from './pages/Advisor'
import Feedback from './pages/Feedback'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/chat" element={<Advisor/>} />
            <Route path="/feedback" element={<Feedback/>} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin/>
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
