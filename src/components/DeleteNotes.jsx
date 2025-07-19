import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteNotes = () => {
  const { state }   = useLocation();
  const navigate    = useNavigate();
  const username    = state?.username || "";   // must be supplied

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  // ⬇ fetch only once
  useEffect(() => {
    if (!username) return;
    (async () => {
      try {
        const res   = await axios.get(
          `https://react-notes-app-backend-9ly8.onrender.com/api/notes?username=${encodeURIComponent(username)}`
        );
        const data  = Array.isArray(res.data) ? res.data : res.data.notes;
        setNotes(data || []);
      } catch {
        setError("Could not load notes – please retry.");
      }
    })();
  }, [username]);

  // ⬇ delete handler
  const deleteOne = async (id) => {
    if (!window.confirm("Permanently delete this note?")) return;
    try {
      await axios.delete(
        `https://react-notes-app-backend-9ly8.onrender.com/api/notes/${id}?username=${encodeURIComponent(username)}`
      );
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch {
      setError("Delete failed – try again.");
    }
  };

  if (!username)        return <p className="p-6">No username supplied.</p>;
  if (error)            return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Delete a Note</h1>

      {notes.length === 0 ? (
        <p className="italic text-gray-600">
          Nothing to delete.{" "}
          <span
            onClick={() => navigate("/addNotes", { state: { username } })}
            className="text-blue-500 underline cursor-pointer"
          >
            Add a note
          </span>{" "}
          first!
        </p>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          {notes.map((n) => (
            <div
              key={n._id}
              className="bg-white p-4 rounded shadow flex justify-between hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-700">{n.title}</h3>
                <p className="text-gray-500 text-sm">{n.date}</p>
                <p className="mt-2">{n.note}</p>
              </div>

              <button
                onClick={() => deleteOne(n._id)}
                className="text-red-600 hover:text-red-800 text-xl self-start ml-4"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeleteNotes;
