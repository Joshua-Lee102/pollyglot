import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './src/header.jsx'
import Body from './src/body.jsx'

function App() {
  return (
    <div>
        <Header/>
        <Body/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);