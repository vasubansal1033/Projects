import React from 'react'

export default function ListItem(text) {
  return (
    <div>
        <p>{text}</p>
        <button>Delete</button>
    </div>
  )
}
