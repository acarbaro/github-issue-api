import React from 'react'

export default function Label({ label }) {

   return (
      <a 
         style={{ 
            background: `#${label.color}` 
         }} 
         className="suggestion-label"
      >
         {label.name}
      </a>
   )
}
