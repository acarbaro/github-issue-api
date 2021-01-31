import React from 'react'

export default function ToastError({ message }) {
   return (
      <div className="toast-error">
         <p>{message}</p>
      </div>
   )
}
