import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ShowNotes = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const username = state?.username || "";

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notes?username=${encodeURIComponent(username)}`
        );
        setNotes(res.data || []);
        console.log(res)
      } catch {
        setError("Could not load notes – please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  if (!username) return <p className="p-6 text-center">No username supplied.</p>;
  if (loading) return <p className="p-6 text-center">Loading notes…</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-10">
          Notes for {username}
        </h1>

        {notes.length === 0 ? (
          <p className="text-center text-gray-600 italic">
            No notes yet.{" "}
            <span
              onClick={() => navigate("/notes", { state: { username } })}
              className="text-blue-500 underline cursor-pointer hover:text-blue-700"
            >
              Add one
            </span>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {notes.map((n) => (
              <div
                key={n._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{n.title}</h3>
                <p className="text-sm text-gray-500">{n.date}</p>
                <p className="mt-4 text-gray-700 whitespace-pre-wrap">{n.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowNotes;
