import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold">Smart Financial Advice, <span className="text-blue-400">Powered by AI</span></h1>
          <p className="mt-4 text-gray-300">Get personalized financial guidance tailored to your goals.</p>
          <div className="mt-6 flex gap-4"> 
            <Link to="/chat" className="bg-blue-600 px-4 py-2 rounded">Get Started</Link>
            <Link to="/feedback" className="border border-gray-600 px-4 py-2 rounded">Share Feedback</Link>
          </div>
        </div>
        <div>
          <div className="bg-gray-800 p-6 rounded shadow-md">
            <h3 className="font-semibold">Why Choose MoneySmart?</h3>
            <ul className="mt-4 text-gray-300 list-disc pl-5">
              <li>AI-Powered Advice</li>
              <li>Smart Analytics</li>
              <li>Secure & Private</li>
              <li>Expert Insights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
