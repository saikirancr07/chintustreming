# 🎬 Streaming Platform Frontend

A modern **Streaming Platform Frontend** built using **React and Vite** that allows users to browse and watch videos across different categories. The application implements **authentication with protected routes** and uses **React Context API** for global state management.

---

## 🚀 Features

* 🔐 **User Authentication**
* 🛡️ **Protected Routes**
* 🎥 Watch videos using a video player
* 📊 Multiple video categories (Trending, Gaming)
* 💾 Save videos to watch later
* 🌙 Light Mode / Dark Mode theme switching
* 📌 Active route highlighting (Home, Trending, Gaming, Saved Videos)
* ⏳ Loading indicators during API calls
* 📅 Date formatting for published videos
* 📱 Responsive UI

---

## 📌 Routes

The application contains the following routes:

* **/login** → Login page for user authentication
* **/** → Home page displaying recommended videos
* **/videos/:id** → Video item details page
* **/trending** → Trending videos
* **/gaming** → Gaming videos
* **/saved-videos** → Saved videos list

---

## 🧠 Context API (Global State Management)

The application uses a **Context folder** to manage global states across the application.

The Context stores:

* **savedVideosList** → Stores all saved videos added by the user
* **theme** → Controls **light mode and dark mode** background styling
* **activeRoute** → Tracks the currently active navigation route

  * Home
  * Trending
  * Gaming
  * Saved Videos

This allows components to **share state without prop drilling**.

---

## 🛠️ Tech Stack

* **React**
* **Vite**
* **JavaScript**
* **CSS**

---

## 📦 Third Party Packages Used

| Package              | Purpose                                |
| -------------------- | -------------------------------------- |
| react-router-dom     | Routing between pages                  |
| react-icons          | Icons for UI components                |
| react-loader-spinner | Display loading animations             |
| js-cookie            | Store and manage authentication tokens |
| date-fns             | Format and manipulate dates            |
| react-player         | Play streaming videos                  |
| reactjs-popup        | Display popup components               |

Install dependencies:

```bash
npm install react-router-dom react-icons react-loader-spinner js-cookie date-fns react-player reactjs-popup
```

---

## 🔐 Authentication & Protected Routes

* Users must **log in** to access the platform.
* Authentication tokens are stored using **cookies** via the `js-cookie` package.
* **Protected Routes** restrict access to pages like Home, Trending, Gaming, Saved Videos, and Video Details.
* If a user is not authenticated, they will be redirected to the **Login page**.

---

## 📂 Project Structure

```
src
│
├── components
│   ├── Login
│   ├── Home
│   ├── Trending
│   ├── Gaming
│   ├── SavedVideos
│   ├── VideoItemDetails
│   ├── Header
│   └── ProtectedRoute
│
├── context
│   └── AppContext.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ▶️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/saikirancr07/chintustreming
```

### 2️⃣ Navigate to the Project Folder

```bash
cd CHINTUWatchApp
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

## 📦 Build for Production

```bash
npm run build
```

