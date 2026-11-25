
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

export default function LoginPage() {
  const { users, selectUser, loading, error } = useRole();
  const [selectedUser, setSelectedUser] = useState("u1");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setSubmitting(true);

    const success = await selectUser(selectedUser);

    setSubmitting(false);

    if (success) {
      navigate("/");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">SF</div>

        <h1>Welcome to Salesforce CRM</h1>
        <p>Select a demo user to continue</p>

        <form onSubmit={handleLogin}>
          <label>Select User</label>

          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            disabled={loading || submitting}
          >
            {users.map((item) => (
              <option key={item.Id} value={item.Id}>
                {item.Name} — {item.Role}
              </option>
            ))}
          </select>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            disabled={loading || submitting || users.length === 0}
          >
            {submitting ? "Please wait..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
