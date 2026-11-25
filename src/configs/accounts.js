
export default {
  key: "accounts",
  title: "Accounts",
  singular: "Account",
  icon: "🏢",
  description: "Manage business accounts",
  fields: [
    { name: "Name", label: "Account Name", type: "text", required: true },
    { name: "Industry", label: "Industry", type: "text" },
    { name: "Website", label: "Website", type: "url" },
    { name: "Phone", label: "Phone", type: "tel" },
    { name: "AnnualRevenue", label: "Annual Revenue", type: "number" },
    { name: "BillingCity", label: "Billing City", type: "text" }
  ]
};
