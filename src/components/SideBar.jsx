import {
  Home,
  Search,
  MessageSquare,
  User,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";
import { useFeed } from "../context/feedcontext";
import { useState } from "react";

export default function Navbar() {
  const { addFeed } = useFeed();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newFeed, setNewFeed] = useState({ image: "", description: "" });

  const handleCreateFeed = () => {
    if (newFeed.image && newFeed.description) {
      addFeed(newFeed.image, newFeed.description);
      setNewFeed({ image: "", description: "" });
      setIsCreateOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 dark:bg-gray-700 text-white p-2 rounded-full"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={`fixed top-0 left-0 w-64 min-h-screen bg-gray-200 dark:bg-gray-800 p-6 text-gray-900 dark:text-white flex flex-col space-y-6 transition-transform transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:fixed md:block z-40`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="space-y-4">
          <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 w-full text-left transition">
            <Home className="w-6 h-6" /> <span>Home</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 w-full text-left transition">
            <Search className="w-6 h-6" /> <span>Search</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 w-full text-left transition">
            <MessageSquare className="w-6 h-6" /> <span>Messages</span>
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 w-full text-left transition"
          >
            <PlusCircle className="w-6 h-6" /> <span>Create</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 w-full text-left transition">
            <User className="w-6 h-6" /> <span>Profile</span>
          </button>
        </nav>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative transition-colors">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-2 right-2 text-gray-900 dark:text-white text-xl hover:cursor-pointer"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Create Feed
            </h2>

            <input
              type="text"
              placeholder="Image URL"
              className="w-full p-2 mb-4 bg-gray-300 dark:bg-gray-700 rounded text-gray-900 dark:text-white"
              value={newFeed.image}
              onChange={(e) =>
                setNewFeed({ ...newFeed, image: e.target.value })
              }
            />

            {newFeed.image && (
              <img
                src={newFeed.image}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <textarea
              placeholder="Description"
              className="w-full p-2 mb-4 bg-gray-300 dark:bg-gray-700 rounded text-gray-900 dark:text-white"
              value={newFeed.description}
              onChange={(e) =>
                setNewFeed({ ...newFeed, description: e.target.value })
              }
            ></textarea>

            <button
              onClick={handleCreateFeed}
              className="w-full p-2 bg-blue-500 rounded text-white"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </>
  );
}
