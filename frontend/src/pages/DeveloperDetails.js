import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function DeveloperDetails() {
  const { id } = useParams()
  const [developer, setDeveloper] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`/api/developers/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Developer not found")
        return res.json()
      })
      .then(data => setDeveloper(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!developer) return null

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", background: "white", padding: "20px", borderRadius: "6px" }}>
      <h2>{developer.name}</h2>
      <p><strong>Role:</strong> {developer.role}</p>
      <p><strong>Email:</strong> {developer.email}</p>
      <p><strong>Skills:</strong> {developer.skills.join(", ")}</p>
      <Link to="/developers">Back to Developers</Link>
    </div>
  )
}
