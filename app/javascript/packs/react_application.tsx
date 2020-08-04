import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/react/App'
import '../styles/react_application.sass'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  )
})
