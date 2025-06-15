import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddDeveloper() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    skills: ""
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState(null)
  const navigate = useNavigate()

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = "Name required"
    if (!form.role.trim()) errs.role = "Role required"
    if (!form.email.trim()) {
      errs.email = "Email required"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Email invalid"
    }
    const skillsArr = form.skills.split(",").map(s => s.trim()).filter(s => s)
    if (skillsArr.length < 1) errs.skills = "At least one skill required"
    return errs
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setSubmitError(null)
    const payload = {
      name: form.name,
      role: form.role,
      email: form.email,
      skills: form.skills.split(",").map(s => s.trim()).filter(s => s)
    }
    fetch("/api/developers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add developer")
        return res.json()
      })
      .then(() => navigate("/developers"))
      .catch(err => setSubmitError(err.message))
  }

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Add Developer</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.skills && <p style={{ color: "red" }}>{errors.skills}</p>}
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>Add Developer</button>
        {submitError && <p style={{ color: "red" }}>{submitError}</p>}
      </form>
    </div>
  )
}
