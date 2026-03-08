// app/admin/components/Filters.jsx
"use client";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name/email"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="border px-2 py-1 rounded"
      />
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border px-2 py-1 rounded"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Reviewed">Reviewed</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="text"
        placeholder="Filter by course ID"
        value={filters.course_id}
        onChange={(e) => setFilters({ ...filters, course_id: e.target.value })}
        className="border px-2 py-1 rounded"
      />
    </div>
  );
}
