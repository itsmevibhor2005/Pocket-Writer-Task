import { useState, useEffect } from "react";
import { Heart, Trash } from "lucide-react";
import { useFeed } from "../context/feedcontext";

export default function InstagramFeed() {
  const { feeds, setFeeds,  setLikes, likes, deleteFeed, toggleLike } = useFeed();
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [hoveredFeed, setHoveredFeed] = useState(null);
  const [feedToDelete, setFeedToDelete] = useState(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${
            Math.floor(Math.random() * 10) + 1
          }&limit=10`
        );
       
        const data = await response.json();
        const formattedFeeds = data.map((feed) => ({
          id: feed.id,
          username: `User_${feed.id}`,
          image: feed.download_url,
          description: `A beautiful random image by ${feed.author}`,
          likes: Math.floor(Math.random() * 100),
        }));
        const savedFeeds = JSON.parse(localStorage.getItem("userFeeds")) || [];

        setFeeds([...savedFeeds, ...formattedFeeds]);

        setLikes(randomLikes);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchFeeds();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Feeds</h1>

        {feeds.map((feed) => (
          <div
            key={feed.id}
            onMouseEnter={() => setHoveredFeed(feed.id)}
            onMouseLeave={() => setHoveredFeed(null)}
            className="p-6 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg cursor-pointer bg-white dark:bg-gray-800 hover:shadow-xl transition"
            onClick={() => setSelectedFeed(feed)}
          >
            <h2 className="text-md font-bold mb-3">{feed.username}</h2>
            <img
              src={feed.image}
              alt={feed.description}
              className="w-full h-60 object-cover rounded-lg shadow-md"
            />

            <p className="mt-3">{feed.description}</p>
            <div className="flex w-full justify-between items-center mt-3">
              <div className="flex items-center space-x-1">
                <button
                  className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(feed.id);
                  }}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      likes[feed.id] > feed.likes
                        ? "text-red-500"
                        : "text-gray-400 dark:text-gray-300"
                    }`}
                  />
                </button>
                <span className="text-sm ml-2 font-medium">
                  {likes[feed.id]}
                </span>
              </div>

              {hoveredFeed === feed.id && feed.username === "You" && (
                <button
                  className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-opacity duration-300 opacity-100 hover:cursor-pointer"
                  onClick={() => setFeedToDelete(feed.id)}
                >
                  <Trash className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {feedToDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 rounded-lg shadow-lg w-96 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
            <h2 className="text-lg font-bold mb-4">Delete Feed?</h2>
            <p className="mb-6">
              Are you sure you want to delete this feed? This action cannot be
              undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setFeedToDelete(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-500 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteFeed(feedToDelete);
                  setFeedToDelete(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
