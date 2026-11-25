
import React from "react";
import { Link } from "react-router-dom";

export default function ModuleCard({ module }) {
  return (
    <Link to={`/${module.key}`} className="module-card">
      <div className="module-icon">{module.icon}</div>

      <h3>{module.title}</h3>

      <p>{module.description}</p>

      <span>Open module →</span>
    </Link>
  );
}
