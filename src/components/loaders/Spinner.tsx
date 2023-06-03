import React from 'react'

export default function Spinner() {
  return (
    <div>
        <div role="status">
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
             </svg>
    <span className="sr-only">Loading...</span>
  </div>
    </div>
  )
}
