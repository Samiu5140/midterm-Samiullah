import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"

export default function Header() {
  return (
    <header className="header">
      <h1>Developer Directory</h1>
      <nav>
        <Link to="/developers">Developers</Link>
        <Link to="/add-developer">Add Developer</Link>
      </nav>
    </header>
  )
}
