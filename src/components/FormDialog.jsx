
import React from "react";

export default function FormDialog({
  open,
  title,
  children,
  onClose
}) {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onMouseDown={onClose}>
      <div
        className="dialog-card"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          <h2>{title}</h2>

          <button
            type="button"
            className="dialog-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        <div className="dialog-body">
          {children}
        </div>
      </div>
    </div>
  );
}
