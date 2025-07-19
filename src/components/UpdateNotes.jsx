import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateNotes = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const username = state?.username || "Guest";
  console.log(username)

  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: "", note: "" });
  const [error, setError] = useState("");

  /* fetch notes once */
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://react-notes-app-backend-9ly8.onrender.com/api/notes?username=${encodeURIComponent(username)}`
        );
       const data  = Array.isArray(res.data) ? res.data : res.data.notes;
        setNotes(data || []);
      } catch {
        setError("Could not load notes – please retry.");
      }
    })();
  }, [username]);

  /* open editor for a note */
  const startEdit = (n) => {
    setEditingId(n._id);
    setDraft({ title: n.title, note: n.note });
  };

  /* cancel editing */
  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ title: "", note: "" });
  };

  /* handle PUT */
  const saveEdit = async (id) => {
    if (!draft.title || !draft.note) return;
    try {
      await axios.put(`https://react-notes-app-backend-9ly8.onrender.com/api/notes/${id}`, draft);
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, ...draft } : n))
      );
      cancelEdit();
    } catch {
      setError("Update failed – try again.");
    }
  };

  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Edit Your Notes
      </h1>

     {notes.length === 0 ? (
  <p className="italic text-gray-600">
    Nothing here yet.{" "}
    <span
      onClick={() => navigate("/addNote", { state: { username } })}
      className="text-blue-500 underline cursor-pointer"
    >
      Add a note
    </span>{" "}
    first!
  </p>
) : (
  <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
    {notes.map((n) => (
      <div key={n._id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-all">
        {editingId === n._id ? (
          <>
            <input
              className="w-full border p-2 mb-2 rounded"
              value={draft.title}
              onChange={(e) =>
                setDraft({ ...draft, title: e.target.value })
              }
            />
            <textarea
              rows={4}
              className="w-full border p-2 rounded"
              value={draft.note}
              onChange={(e) =>
                setDraft({ ...draft, note: e.target.value })
              }
            />
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => saveEdit(n._id)}
                className="flex items-center gap-1 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <FiSave /> Save
              </button>
              <button
                onClick={cancelEdit}
                className="flex items-center gap-1 px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                <FiX /> Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-blue-700 mb-1">
              {n.title}
            </h3>
            <p className="whitespace-pre-wrap text-gray-700 text-md">
              {n.note}
            </p>
            <button
              onClick={() => startEdit(n)}
              className="mt-3 flex items-center text-green-600 hover:text-green-800 gap-1"
            >
              <FiEdit /> Edit
            </button>
          </>
        )}
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default UpdateNotes;
