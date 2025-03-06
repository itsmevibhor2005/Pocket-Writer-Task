import { useState, useEffect } from "react";
import "./App.css";
import InstagramFeed from "./components/InstaFeed";
import Navbar from "./components/SideBar";
import { FeedProvider } from "./context/feedcontext";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (

    <FeedProvider>
      <Navbar />
      <InstagramFeed />
      <ThemeToggle/>
    </FeedProvider>
  );
}

export default App;
