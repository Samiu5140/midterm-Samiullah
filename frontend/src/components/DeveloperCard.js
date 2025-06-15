import React from "react"

export default function DeveloperCard({ name, role, skills }) {
  return (
    <div style={cardStyle}>
      <h3>{name}</h3>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Skills:</strong> {skills.join(", ")}</p>
    </div>
  )
}

DeveloperCard.defaultProps = {
  name: "Unknown Developer",
  role: "No role specified",
  skills: ["None"]
}

const cardStyle = {
  backgroundColor: "white",
  padding: "15px",
  margin: "10px 0",
  borderRadius: "6px",
  boxShadow: "0 0 6px rgba(0,0,0,0.1)"
}
