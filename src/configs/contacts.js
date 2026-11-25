
export default {
  key: "contacts",
  title: "Contacts",
  singular: "Contact",
  icon: "👥",
  description: "Manage customer contacts",
  fields: [
    { name: "FirstName", label: "First Name", type: "text" },
    { name: "LastName", label: "Last Name", type: "text", required: true },
    { name: "Email", label: "Email", type: "email" },
    { name: "Phone", label: "Phone", type: "tel" },
    { name: "Title", label: "Job Title", type: "text" },
    {
      name: "AccountId",
      label: "Account",
      type: "reference",
      reference: "accounts"
    }
  ]
};
