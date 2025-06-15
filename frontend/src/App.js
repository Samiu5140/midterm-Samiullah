import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Developers from "./pages/Developers"
import DeveloperDetails from "./pages/DeveloperDetails"
import AddDeveloper from "./pages/AddDeveloper"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/developers" />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/developers/:id" element={<DeveloperDetails />} />
        <Route path="/add-developer" element={<AddDeveloper />} />
      </Routes>
    </>
  )
}

export default App
