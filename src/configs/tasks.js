
export default {
  key: "tasks",
  title: "Tasks",
  singular: "Task",
  icon: "📋",
  description: "Manage CRM activities",
  fields: [
    { name: "Subject", label: "Subject", type: "text", required: true },
    {
      name: "Status",
      label: "Status",
      type: "select",
      options: ["Not Started", "In Progress", "Completed"]
    },
    {
      name: "Priority",
      label: "Priority",
      type: "select",
      options: ["Low", "Normal", "High"]
    },
    { name: "ActivityDate", label: "Due Date", type: "date" },
    { name: "RelatedToId", label: "Related Record ID", type: "text" }
  ]
};
