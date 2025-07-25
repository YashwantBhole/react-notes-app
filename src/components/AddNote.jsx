// AddNote.js
import React, { useState } from "react";
import axios from "axios";
import { useLocation} from "react-router-dom";

const AddNote = () => {
   const {state} = useLocation();
   const username= state?.username || "Guest User"

  const [formData, setFormData] = useState({
    username,
    title: "",
    note: "",
    date: new Date().toISOString(),
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic front‑end validation
    if (!formData.title || !formData.note) {
      setMessage("Please enter both a title and a note before submitting!");
      return;
    }

    try {
      const res = await axios.post(
        "https://react-notes-app-backend-9ly8.onrender.com/api/notes",
        formData
      );
      setMessage(res.data.message || "Note saved successfully! 🎉");
      // Clear only the fields the user typed
      setFormData({ ...formData, title: "", note: "" });
    } catch {
      setMessage("An error occurred while saving the note.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        Add a New Note
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Enter note title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="note"
            placeholder="Enter your note here..."
            rows={5}
            value={formData.note}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
            cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Note
          </button>
        </form>
      </div>

      {message && <div className="mt-4 text-blue-600 font-medium">{message}</div>}
    </div>
  );
};

export default AddNote;
