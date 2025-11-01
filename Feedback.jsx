import React from 'react'
import FeedbackForm from '../components/FeedbackForm'

export default function Feedback(){
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Share Your Feedback</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded">
          <h3 className="font-semibold">Why Your Feedback Matters</h3>
          <p className="mt-2 text-gray-300">Help us improve and shape new features.</p>
        </div>
        <FeedbackForm />
      </div>
    </div>
  )
}
