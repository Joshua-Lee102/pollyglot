import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './src/header.js'
import Body from './src/body.js'

function App() {
  return (
    <div>
        <Header/>
        <Body/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);