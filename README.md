# Instagram Clone

This is a **React-based Instagram Clone** with features like feed display, post creation, likes, and a dark/light theme toggle.

## 🚀 Features

- **Instagram-like Feed**: Fetches random images from an API and allows user-generated posts.
- **Like Feature**: Users can like/unlike posts.
- **Post Creation**: Users can add new posts with an image URL and description.
- **Post Deletion**: Users can delete their own posts.
- **Dark/Light Mode**: Toggle between dark and light mode.
- **Responsive Sidebar**: Fully responsive navigation.
- **Local Storage**: Stores posts persistently in local storage.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **State Management**: Context API
- **Icons**: Lucide React
- **Storage**: LocalStorage




## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/Pocket-Writer-Task.git

cd Pocket-Writer-Task
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm run dev
```

The app will be available at http://localhost:5173/ (if using Vite).

## 🎨 Theme Toggle

The theme toggle button is implemented with useContext. The theme is stored in localStorage to persist across sessions.

## 📌 Local Storage Handling

- **Posts**: Stored under the key feeds.
- **Likes**: Stored under likes.
- **Theme**: Stored under theme.

## 👨‍💻 Author

Developed by Vibhor Srivastava