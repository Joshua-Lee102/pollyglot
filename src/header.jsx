import React from 'react'
import parrot from './imgs/parrot.png'
import world from './imgs/world-background.png'

export default function Header() {
    const style = {
        backgroundImage: `url(${world})`
    }
  return (
    <div style={style} className="header">
        <img src= {parrot} alt ="Parrot" className="parrot"/>
        <div className="text-container">
            <h1 className="title">Pollyglot</h1>
            <p className="title-text">Perfect Translation Every Time</p>   
        </div>
    </div>
  )
}
