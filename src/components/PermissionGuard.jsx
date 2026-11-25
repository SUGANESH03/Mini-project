
import React from "react";
import { useRole } from "../context/RoleContext";

export default function PermissionGuard({
  module,
  action = "read",
  children,
  fallback = null
}) {
  const { can, loading } = useRole();

  if (loading) {
    return <p>Checking permissions...</p>;
  }

  if (!can(module, action)) {
    return fallback || (
      <div className="access-denied">
        <h3>Access Restricted</h3>
        <p>You do not have permission to perform this action.</p>
      </div>
    );
  }

  return children;
}
