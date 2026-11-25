
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { Link, useParams } from "react-router-dom";

import { get, post, patch, del } from "../../lib/api.js";

import modules from "../configs/modules";
import { useRole } from "../context/RoleContext";

import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import DynamicForm from "../components/DynamicForm";
import FormDialog from "../components/FormDialog";

export default function ModulePage() {
  const { module } = useParams();
  const config = modules[module];

  const {
    user,
    canAccess,
    can
  } = useRole();

  const [records, setRecords] = useState([]);
  const [references, setReferences] = useState({});
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formValues, setFormValues] = useState({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Role permissions
  const canRead = config && canAccess(config.key);
  const canCreate = config && can(config.key, "create");
  const canUpdate = config && can(config.key, "update");
  const canDelete = config && can(config.key, "delete");

  // Load records
  const loadRecords = useCallback(async () => {
    if (!config || !canAccess(config.key)) return;

    try {
      setLoading(true);
      setError("");

      const result = await get(`/${config.key}`);

      setRecords(
        Array.isArray(result)
          ? result
          : Array.isArray(result?.records)
          ? result.records
          : []
      );
    } catch (err) {
      setError(err.message || "Unable to load records");
    } finally {
      setLoading(false);
    }
  }, [config, canAccess]);

  // Load reference records
  const loadReferences = useCallback(async () => {
    if (!config || !canAccess(config.key)) return;

    const referenceModules = [
      ...new Set(
        config.fields
          .filter(field => field.type === "reference")
          .map(field => field.reference)
          .filter(Boolean)
      )
    ];

    if (!referenceModules.length) {
      setReferences({});
      return;
    }

    try {
      const results = await Promise.all(
        referenceModules.map(async key => {
          const result = await get(`/${key}`);

          return [
            key,
            Array.isArray(result)
              ? result
              : result?.records || []
          ];
        })
      );

      setReferences(Object.fromEntries(results));
    } catch (err) {
      setError(err.message || "Unable to load related records");
    }
  }, [config, canAccess]);

  // Initial loading
  useEffect(() => {
    if (!config || !canAccess(config.key)) {
      setLoading(false);
      return;
    }

    loadRecords();
    loadReferences();
  }, [config, canAccess, loadRecords, loadReferences]);

  // Search records
  const filteredRecords = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return records;

    return records.filter(record =>
      Object.values(record).some(value =>
        String(value ?? "").toLowerCase().includes(term)
      )
    );
  }, [records, search]);

  // Table columns
  const columns = useMemo(() => {
    if (!config) return [];

    return config.fields.map(field => ({
      key: field.name,
      label: field.label
    }));
  }, [config]);

  // Open create form
  function openCreateDialog() {
    if (!canCreate) return;

    setEditingRecord(null);
    setFormValues({});
    setError("");
    setNotice("");
    setDialogOpen(true);
  }

  // Open edit form
  function openEditDialog(record) {
    if (!canUpdate) return;

    setEditingRecord(record);
    setFormValues({ ...record });
    setError("");
    setNotice("");
    setDialogOpen(true);
  }

  // Close form
  function closeDialog() {
    setDialogOpen(false);
    setEditingRecord(null);
    setFormValues({});
  }

  // Create or update
  async function handleSave() {
    if (editingRecord ? !canUpdate : !canCreate) return;

    try {
      setSaving(true);
      setError("");
      setNotice("");

      const payload = { ...formValues };

      const restrictedFields = [
        "Id",
        "OwnerId",
        "CreatedDate",
        "LastModifiedDate",
        "SystemModstamp"
      ];

      restrictedFields.forEach(field => {
        delete payload[field];
      });

      if (editingRecord) {
        await patch(
          `/${config.key}/${editingRecord.Id}`,
          payload
        );

        setNotice(`${config.singular} updated successfully.`);
      } else {
        await post(`/${config.key}`, payload);

        setNotice(`${config.singular} created successfully.`);
      }

      closeDialog();
      await loadRecords();

    } catch (err) {
      setError(err.message || "Unable to save record");
    } finally {
      setSaving(false);
    }
  }

  // Delete record
  async function handleDelete(record) {
    if (!canDelete) return;

    const confirmed = window.confirm(
      `Delete this ${config.singular.toLowerCase()}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setError("");
      setNotice("");

      await del(`/${config.key}/${record.Id}`);

      setNotice(`${config.singular} deleted successfully.`);

      await loadRecords();

    } catch (err) {
      setError(err.message || "Unable to delete record");
    }
  }

  // Invalid module
  if (!config) {
    return (
      <main className="module-page">
        <h2>Module not found</h2>
        <Link to="/">Back to Dashboard</Link>
      </main>
    );
  }

  // Access denied
  if (!canRead) {
    return (
      <main className="module-page">
        <h2>Access Denied</h2>
        <p>
          {user?.Role} does not have permission to access this module.
        </p>
        <Link to="/">Back to Dashboard</Link>
      </main>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="loading-screen">
        Loading {config.title}...
      </div>
    );
  }

  return (
    <main className="module-page">

      <header className="module-header">
        <div>
          <Link to="/">← Back to Dashboard</Link>

          <h1>
            {config.icon} {config.title}
          </h1>

          <p>{config.description}</p>
        </div>

        {canCreate && (
          <button onClick={openCreateDialog}>
            + New {config.singular}
          </button>
        )}
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {notice && (
        <div className="success-message">
          {notice}
        </div>
      )}

      <section className="records-section">

        <div className="records-toolbar">
          <div>
            <h2>{config.title} Records</h2>

            <p>
              {filteredRecords.length} records found
            </p>
          </div>

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={`Search ${config.title.toLowerCase()}...`}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredRecords}
          loading={false}
          onEdit={canUpdate ? openEditDialog : undefined}
          onDelete={canDelete ? handleDelete : undefined}
          canUpdate={canUpdate}
          canDelete={canDelete}
        />

      </section>

      {(canCreate || canUpdate) && (
        <FormDialog
          open={dialogOpen}
          title={
            editingRecord
              ? `Edit ${config.singular}`
              : `Create ${config.singular}`
          }
          onClose={closeDialog}
        >
          <DynamicForm
            fields={config.fields}
            values={formValues}
            onChange={setFormValues}
            onSubmit={handleSave}
            onCancel={closeDialog}
            submitLabel={
              editingRecord
                ? "Update Record"
                : "Create Record"
            }
            saving={saving}
            referenceOptions={references}
          />
        </FormDialog>
      )}

    </main>
  );
}
