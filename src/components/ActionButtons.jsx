
import React from "react";

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
  canUpdate = true,
  canDelete = true
}) {
  return (
    <div className="action-buttons">
      {onView && (
        <button type="button" className="view-btn" onClick={onView}>
          View
        </button>
      )}

      {canUpdate && onEdit && (
        <button type="button" className="edit-btn" onClick={onEdit}>
          Edit
        </button>
      )}

      {canDelete && onDelete && (
        <button type="button" className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  );
}
