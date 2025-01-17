import React, { useState } from "react";
import './styles/Registration.css';

const Registration = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("User Registered!");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
