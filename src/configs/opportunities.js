
export default {
  key: "opportunities",
  title: "Opportunities",
  singular: "Opportunity",
  icon: "💼",
  description: "Track potential sales revenue",
  fields: [
    { name: "Name", label: "Opportunity Name", type: "text", required: true },
    {
      name: "AccountId",
      label: "Account",
      type: "reference",
      reference: "accounts",
      required: true
    },
    {
      name: "StageName",
      label: "Stage",
      type: "select",
      required: true,
      options: [
        "Prospecting",
        "Qualification",
        "Proposal",
        "Negotiation",
        "Closed Won",
        "Closed Lost"
      ]
    },
    { name: "Amount", label: "Amount", type: "number" },
    { name: "CloseDate", label: "Close Date", type: "date", required: true },
    { name: "Probability", label: "Probability (%)", type: "number" }
  ]
};
