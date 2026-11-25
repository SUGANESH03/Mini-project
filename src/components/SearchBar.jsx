
import React from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search records..."
}) {
  return (
    <div className="crm-search">
      <span>⌕</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
