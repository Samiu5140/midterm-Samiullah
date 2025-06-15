const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

let developers = [
  { id: 1, name: "Alice", role: "Frontend", email: "alice@example.com", skills: ["React", "CSS"] },
  { id: 2, name: "Bob", role: "Backend", email: "bob@example.com", skills: ["Node.js", "Express"] },
  { id: 3, name: "Charlie", role: "Fullstack", email: "charlie@example.com", skills: ["React", "Node.js"] }
]

app.get("/api/developers", (req, res) => {
  res.json(developers)
})

app.get("/api/developers/:id", (req, res) => {
  const dev = developers.find(d => d.id === parseInt(req.params.id))
  if (!dev) return res.status(404).json({ error: "Developer not found" })
  res.json(dev)
})

app.get("/api/search", (req, res) => {
  const { role } = req.query
  if (!role) return res.json(developers)
  const filtered = developers.filter(d => d.role.toLowerCase() === role.toLowerCase())
  res.json(filtered)
})

app.post("/api/developers", (req, res) => {
  const { name, role, email, skills } = req.body
  const errors = {}
  if (!name || !name.trim()) errors.name = "Name required"
  if (!role || !role.trim()) errors.role = "Role required"
  if (!email || !email.trim()) errors.email = "Email required"
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email"
  if (!Array.isArray(skills) || skills.length < 1) errors.skills = "At least one skill required"

  if (Object.keys(errors).length > 0) return res.status(400).json({ errors })

  const newDev = {
    id: developers.length ? developers[developers.length - 1].id + 1 : 1,
    name,
    role,
    email,
    skills
  }
  developers.push(newDev)
  res.status(201).json(newDev)
})

const PORT = 5000
app.listen(PORT)
