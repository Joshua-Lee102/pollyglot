import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from '/src/header'
import Body from '/src/body'

function App() {
  return (
    <div>
        <Header/>
        <Body/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);