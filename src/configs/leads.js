
export default {
  key: "leads",
  title: "Leads",
  singular: "Lead",
  icon: "🎯",
  description: "Manage potential customers",
  fields: [
    { name: "FirstName", label: "First Name", type: "text" },
    { name: "LastName", label: "Last Name", type: "text", required: true },
    { name: "Company", label: "Company", type: "text", required: true },
    { name: "Email", label: "Email", type: "email" },
    { name: "Phone", label: "Phone", type: "tel" },
    {
      name: "Status",
      label: "Lead Status",
      type: "select",
      options: ["New", "Working", "Qualified", "Unqualified", "Converted"]
    },
    {
      name: "LeadSource",
      label: "Lead Source",
      type: "select",
      options: ["Website", "Referral", "Webinar", "Partner", "Outbound"]
    },
    {
      name: "Rating",
      label: "Rating",
      type: "select",
      options: ["Hot", "Warm", "Cold"]
    },
    { name: "Industry", label: "Industry", type: "text" }
  ]
};
