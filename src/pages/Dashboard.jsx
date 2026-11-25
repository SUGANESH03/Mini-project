
import React from "react";
import { Link } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const modules = [
  {
    key: "leads",
    name: "Leads",
    icon: "🎯",
    description: "Manage potential customers"
  },
  {
    key: "accounts",
    name: "Accounts",
    icon: "🏢",
    description: "Manage business accounts"
  },
  {
    key: "contacts",
    name: "Contacts",
    icon: "👥",
    description: "Manage customer contacts"
  },
  {
    key: "opportunities",
    name: "Opportunities",
    icon: "💼",
    description: "Track sales opportunities"
  },
  {
    key: "cases",
    name: "Cases",
    icon: "🎫",
    description: "Manage customer cases"
  },
  {
    key: "tasks",
    name: "Tasks",
    icon: "📋",
    description: "Manage activities"
  }
];

export default function Dashboard() {
  const {
    user,
    users,
    selectUser,
    canAccess,
    loading
  } = useRole();

  async function handleUserChange(event) {
    const success = await selectUser(event.target.value);

    if (!success) {
      alert("Unable to switch persona");
    }
  }

  if (loading && !user) {
    return <div>Loading CRM...</div>;
  }

  const visibleModules = modules.filter(
    module => canAccess(module.key)
  );

  return (
    <div className="dashboard-layout">

      <aside className="sidebar">
        <h2 className="brand">Salesforce CRM</h2>

        <nav>
          <Link to="/">Dashboard</Link>

          {visibleModules.map(module => (
            <Link
              key={module.key}
              to={`/${module.key}`}
            >
              {module.icon} {module.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="dashboard-main">

        <header className="topbar">
          <div>
            <h2>Dashboard</h2>
            <p>CRM workspace overview</p>
          </div>

          <div className="user-section">
            <div>
              <span>{user?.Name}</span>
              <small>{user?.Role}</small>
            </div>

            <select
              value={user?.Id || ""}
              onChange={handleUserChange}
              disabled={loading}
              aria-label="Select classroom persona"
            >
              {users.map(item => (
                <option key={item.Id} value={item.Id}>
                  {item.Name} — {item.Role}
                </option>
              ))}
            </select>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <p>YOUR WORKSPACE</p>

            <h1>
              Welcome back, {user?.Name}!
            </h1>

            <p>
              Here's your CRM workspace. Manage your
              business activities from one place.
            </p>

            <span className="role-label">
              {user?.Role}
            </span>
          </div>
        </section>

        <section className="module-section">
          <h2>Your CRM Modules</h2>

          <div className="module-grid">
            {visibleModules.map(module => (
              <Link
                to={`/${module.key}`}
                className="module-card"
                key={module.key}
              >
                <div className="module-icon">
                  {module.icon}
                </div>

                <h3>{module.name}</h3>

                <p>{module.description}</p>

                <span>Open Module →</span>
              </Link>
            ))}
          </div>

          {visibleModules.length === 0 && (
            <p>No modules available for this persona.</p>
          )}
        </section>

      </main>
    </div>
  );
}
