import React, { useState, useEffect } from "react";
import { Button } from "./ui/button.js";

export function AdminAnalytics() {
  const [token, setToken] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [eventFilter, setEventFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRows = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set("limit", String(limit));
      params.set("offset", String(offset));
      if (eventFilter) params.set("event", eventFilter);

      const res = await fetch(`/api/analytics_admin.php?${params.toString()}`, {
        headers: {
          "X-ADMIN-TOKEN": token,
        },
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || `Status ${res.status}`);
      }

      const json = await res.json();
      setRows(json.data || []);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // do not auto-fetch without token
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-medium mb-4">Analytics Admin</h2>

      <div className="flex gap-3 mb-4 items-center">
        <input
          placeholder="Admin token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="px-3 py-2 rounded border w-64"
        />
        <input
          placeholder="event filter (optional)"
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          className="px-3 py-2 rounded border w-48"
        />
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="px-3 py-2 rounded border w-24"
        />
        <Button onClick={() => { setOffset(0); fetchRows(); }} className="bg-primary text-white">Fetch</Button>
        <Button onClick={() => { setOffset(Math.max(0, offset - limit)); fetchRows(); }} variant="outline">Prev</Button>
        <Button onClick={() => { setOffset(offset + limit); fetchRows(); }} variant="outline">Next</Button>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-600 border-b">
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Event</th>
              <th className="py-2 pr-4">URL</th>
              <th className="py-2 pr-4">Visitor</th>
              <th className="py-2 pr-4">Timestamp</th>
              <th className="py-2 pr-4">Data</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="text-sm border-b hover:bg-gray-50">
                <td className="py-2 pr-4 align-top">{r.id}</td>
                <td className="py-2 pr-4 align-top">{r.event}</td>
                <td className="py-2 pr-4 align-top max-w-xs truncate">{r.url}</td>
                <td className="py-2 pr-4 align-top">{r.visitor_id}</td>
                <td className="py-2 pr-4 align-top">{r.created_at ?? r.timestamp}</td>
                <td className="py-2 pr-4 align-top"><pre className="whitespace-pre-wrap text-xs">{r.data}</pre></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="py-6 text-center text-sm text-gray-500">No rows</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAnalytics;
