
import React from "react";
import ActionButtons from "./ActionButtons";

export default function DataTable({
  columns = [],
  data = [],
  onView,
  onEdit,
  onDelete,
  canUpdate = true,
  canDelete = true,
  loading = false,
  emptyMessage = "No records found"
}) {
  if (loading) {
    return <div className="table-message">Loading records...</div>;
  }

  if (!data.length) {
    return <div className="table-message">{emptyMessage}</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="crm-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}

            {(onView || onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((record) => (
            <tr key={record.Id}>
              {columns.map((column) => {
                const value = record[column.key];

                return (
                  <td key={column.key}>
                    {value === null || value === undefined || value === ""
                      ? "—"
                      : typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                  </td>
                );
              })}

              {(onView || onEdit || onDelete) && (
                <td>
                  <ActionButtons
                    onView={onView ? () => onView(record) : undefined}
                    onEdit={onEdit ? () => onEdit(record) : undefined}
                    onDelete={onDelete ? () => onDelete(record) : undefined}
                    canUpdate={canUpdate}
                    canDelete={canDelete}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
