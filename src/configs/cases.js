
export default {
  key: "cases",
  title: "Cases",
  singular: "Case",
  icon: "🎫",
  description: "Manage customer support cases",
  fields: [
    { name: "Subject", label: "Subject", type: "text", required: true },
    { name: "Description", label: "Description", type: "textarea" },
    {
      name: "AccountId",
      label: "Account",
      type: "reference",
      reference: "accounts"
    },
    {
      name: "ContactId",
      label: "Contact",
      type: "reference",
      reference: "contacts"
    },
    {
      name: "Status",
      label: "Status",
      type: "select",
      options: ["New", "Working", "Escalated", "Closed"]
    },
    {
      name: "Priority",
      label: "Priority",
      type: "select",
      options: ["Low", "Medium", "High", "Critical"]
    },
    {
      name: "Origin",
      label: "Origin",
      type: "select",
      options: ["Phone", "Email", "Web", "Chat"]
    }
  ]
};
