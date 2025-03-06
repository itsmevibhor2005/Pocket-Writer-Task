import { createContext, useContext, useState, useEffect } from "react";

const FeedContext = createContext();

export function FeedProvider({ children }) {
  const [feeds, setFeeds] = useState(() => {
    const savedFeeds = localStorage.getItem("feeds");
    return savedFeeds ? JSON.parse(savedFeeds) : [];
  });

  const[likes, setLikes] = useState({});

  useEffect(() => {
    localStorage.setItem("feeds", JSON.stringify(feeds));
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [feeds, likes]);

 const addFeed = (image, description) => {
   const newFeed = {
     id: Date.now(),
     username: "You",
     image,
     description,
     likes: 0,
   };

   const updatedFeeds = [newFeed, ...feeds];

   setFeeds(updatedFeeds);

   // Save only user-created feeds in local storage
   localStorage.setItem(
     "userFeeds",
     JSON.stringify(updatedFeeds.filter((feed) => feed.username === "You"))
   );
 };
 const deleteFeed = (id) => {
   setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.id !== id));
 };

  const toggleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: prevLikes[id]
        ? prevLikes[id] +
          (prevLikes[id] === feeds.find((feed) => feed.id === id).likes
            ? 1
            : -1)
        : 1,
    }));
  };

  return (
    <FeedContext.Provider
      value={{ feeds, setFeeds, likes, setLikes, addFeed,deleteFeed, toggleLike }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  return useContext(FeedContext);
}
