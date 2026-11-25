
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from "react";

import { setDemoUser } from "../../lib/api.js";

const RoleContext = createContext(null);

// CRM modules
const modules = [
  "leads",
  "accounts",
  "contacts",
  "opportunities",
  "cases",
  "tasks"
];

// Predefined classroom personas
const predefinedUsers = [
  {
    Id: "u1",
    Name: "Morgan Admin",
    Role: "Administrator"
  },
  {
    Id: "u2",
    Name: "Riya Sales",
    Role: "Sales Representative"
  },
  {
    Id: "u3",
    Name: "Daniel Manager",
    Role: "Sales Manager"
  },
  {
    Id: "u4",
    Name: "Sam Support",
    Role: "Support Agent"
  }
];

// Predefined permissions
const allPermissions = {
  Administrator: Object.fromEntries(
    modules.map(module => [
      module,
      ["C", "R", "U", "D"]
    ])
  ),

  "Sales Representative": {
    leads: ["C", "R", "U"],
    accounts: ["C", "R", "U"],
    contacts: ["C", "R", "U"],
    opportunities: ["C", "R", "U"],
    cases: ["R"],
    tasks: ["C", "R", "U"]
  },

  "Sales Manager": Object.fromEntries(
    modules.map(module => [
      module,
      ["C", "R", "U", "D"]
    ])
  ),

  "Support Agent": {
    leads: ["R"],
    accounts: ["R"],
    contacts: ["C", "R", "U"],
    opportunities: ["R"],
    cases: ["C", "R", "U"],
    tasks: ["C", "R", "U"]
  }
};

export function RoleProvider({ children }) {
  const [user, setUser] = useState(predefinedUsers[0]);

  const [users] = useState(predefinedUsers);

  const [permissions, setPermissions] = useState(
    allPermissions.Administrator
  );

  const [hiddenFields] = useState({});

  const [loading, setLoading] = useState(false);

  const [error] = useState("");

  // Load default Admin persona
  const loadSession = useCallback(() => {
    const defaultUser = predefinedUsers[0];

    setUser(defaultUser);

    setPermissions(
      allPermissions[defaultUser.Role]
    );

    setDemoUser(defaultUser.Id);
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // Switch persona
  const selectUser = useCallback((userId) => {
    const selectedUser = predefinedUsers.find(
      item => item.Id === userId
    );

    if (!selectedUser) {
      return false;
    }

    setUser(selectedUser);

    setPermissions(
      allPermissions[selectedUser.Role]
    );

    setDemoUser(selectedUser.Id);

    return true;
  }, []);

  // Check module access
  const canAccess = useCallback(
    (module) => {
      return Boolean(
        permissions[module]?.includes("R")
      );
    },
    [permissions]
  );

  // Check CRUD permissions
  const can = useCallback(
    (module, action) => {
      const actions = {
        create: "C",
        read: "R",
        update: "U",
        delete: "D"
      };

      const permission = actions[action];

      return permission
        ? Boolean(
            permissions[module]?.includes(permission)
          )
        : false;
    },
    [permissions]
  );

  // Check hidden fields
  const isFieldHidden = useCallback(
    (module, field) => {
      return Boolean(
        hiddenFields[module]?.includes(field)
      );
    },
    [hiddenFields]
  );

  const value = {
    user,
    users,
    permissions,
    allPermissions,
    hiddenFields,
    loading,
    error,
    selectUser,
    loadSession,
    canAccess,
    can,
    isFieldHidden
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

// Custom hook
export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error(
      "useRole must be used inside RoleProvider"
    );
  }

  return context;
}

export default RoleContext;
