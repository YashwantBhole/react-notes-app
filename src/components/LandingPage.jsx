import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaStickyNote, FaEdit, FaTrash, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const features = [
    {
      icon: <FaPlusCircle className="text-4xl mb-4 mx-auto" />,
      title: "Add Note",
      desc: "Quickly capture new ideas and tasks.",
      route: "/addNote",
    },
    {
      icon: <FaStickyNote className="text-4xl mb-4 mx-auto" />,
      title: "View Notes",
      desc: "Browse all your saved notes in one place.",
      route: "/showNotes",
    },
    {
      icon: <FaEdit className="text-4xl mb-4 mx-auto" />,
      title: "Update Note",
      desc: "Edit existing notes with rich text formatting.",
      route: "/updateNotes",
    },
    {
      icon: <FaTrash className="text-4xl mb-4 mx-auto" />,
      title: "Delete Note",
      desc: "Remove notes you no longer need.",
      route: "/deleteNotes",
    },
  ];

const handleFeatureClick = (path) => {
  if (!user) {
    alert("Please register or log in to use this feature.");
    return;
  }
  navigate(path, { state: { username: user.username } });
};

  return (
    <div className="relative bg-gray-100 h-screen flex flex-col">
      {/* Top Bar with Logout */}
      {user && (
        <div className="absolute top-1 right-4">
          <button
            className="bg-red-500 hover:bg-red-700 transition-colors text-white md:py-2 px-4 rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {/* Hero Section */}
      {user ? (
        <section className="flex flex-col items-center justify-center py-6 md:py-18 lg:py-22 bg-blue-600 text-white text-center px-6">
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-4 ">Dear {user.name}, Welcome to NotesApp</h1>
          <p className="text-lg mb-6">
            An easy-to-use note‑taking app to organize your thoughts
          </p>
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center py-8 lg:py-24 bg-blue-600 text-white text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to NotesApp</h1>
          <p className="text-lg mb-6">
            An easy-to-use note‑taking app to organize your thoughts
          </p>
          <button
            className="bg-green-500 hover:bg-green-700 transition-colors text-white py-2 px-6 rounded-lg text-xl cursor-pointer"
            onClick={handleRegister}
          >
            Register Now
          </button>
        </section>
      )}

      {/* Features Section */}
      <section className="bg-white py-12 px-6 text-center flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          What would you like to do?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:px-32 md:px-24 ">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all cursor-pointer group"
              onClick={() => handleFeatureClick(feature.route)}
            >
              {React.cloneElement(feature.icon, {
                className:
                  "text-blue-600 group-hover:text-blue-800 transition-colors text-4xl mb-4 mx-auto",
              })}
              <h3 className="text-xl font-semibold text-gray-700 group-hover:text-blue-800 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
<footer className="bg-blue-600 text-white py-4 text-center w-full">
  <p className="flex items-center justify-center gap-2">
    © 2025 NotesApp. All Rights Reserved.
    <a
      href="https://github.com/YashwantBhole"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-300"
    >
      <FaGithub className="inline-block text-xl hover:scale-150 hover:bg-black" />
    </a>
  </p>
</footer>

    </div>
  );
};

export default LandingPage;
