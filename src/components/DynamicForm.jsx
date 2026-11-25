
import React from "react";

export default function DynamicForm({
  fields = [],
  values = {},
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  saving = false,
  referenceOptions = {}
}) {
  function handleChange(e) {
    const { name, value, type } = e.target;

    onChange({
      ...values,
      [name]:
        type === "number" && value !== ""
          ? Number(value)
          : value
    });
  }

  return (
    <form
      className="dynamic-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-grid">
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>

            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={values[field.name] ?? ""}
                onChange={handleChange}
                required={Boolean(field.required)}
              >
                <option value="">Select {field.label}</option>

                {(field.options || []).map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "reference" ? (
              <select
                id={field.name}
                name={field.name}
                value={values[field.name] ?? ""}
                onChange={handleChange}
                required={Boolean(field.required)}
              >
                <option value="">Select {field.label}</option>

                {(referenceOptions[field.reference] || []).map((record) => (
                  <option key={record.Id} value={record.Id}>
                    {record.Name ||
                      [record.FirstName, record.LastName].filter(Boolean).join(" ") ||
                      record.Subject ||
                      record.Id}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                rows="4"
                value={values[field.name] ?? ""}
                onChange={handleChange}
                required={Boolean(field.required)}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type === "tel" ? "tel" : field.type}
                value={values[field.name] ?? ""}
                onChange={handleChange}
                required={Boolean(field.required)}
                step={field.type === "number" ? "any" : undefined}
              />
            )}
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
