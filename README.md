# 📚 WorldReader - Frontend

> A React-based frontend for WorldReader, a global book-sharing and reading platform that connects readers worldwide through literature.

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-green.svg)](https://nodejs.org/)

[🎥 Demo Video](https://youtu.be/h9obLlarCBo) | [🌐 Live Demo](#) | [📖 Documentation](#)

## 🌟 Overview

WorldReader is a comprehensive platform that enables users to explore, manage, and publish books while providing administrators with powerful moderation tools. The platform features a unique world map visualization showing the geographic origins of stories, creating a truly global reading experience.

## ✨ Features

### 👤 User Role

- **🏠 Home Page:** Welcome users with a showcase of key features—Library, Store, and World Map.
- **🛒 Store Page:** Browse and add books from a diverse global catalog, with verified author indicators.
- **📚 Library Page:** Curate and manage personal book collections, search, sort, and remove books.
- **🗺️ Map Page:** Explore a heatmap of book origins worldwide, showing where stories come from.
- **👤 Profile Management:** Update personal details, manage account settings, and upload books.
- **🔐 Authentication:** Log in or register to access personalized features, with social login options.

### 🛡️ Admin Role

- **📊 Admin Dashboard:** Overview of users, books, and moderation tasks, including user verification and book deletion.
- **👥 User Management:** Verify users, update verification status, and delete user accounts.
- **📖 Book Moderation:** Review and delete books, ensuring quality content.

## 🛠️ Technologies Used

### Frontend Stack

- **React** - Modern component-based UI framework
- **React Router** - Client-side routing and navigation
- **Material-UI (MUI)** - Component library for consistent UI design
- **Tailwind CSS** - Utility-first CSS framework for sidebar styling
- **React Query** - Data fetching and state management

### Backend Integration

- **Node.js/Express** - Backend API server
- **MongoDB** - NoSQL database for data storage
- **Axios** - HTTP client for API calls

### Additional Tools

- **Leaflet** - Interactive maps for geographic visualization
- **pdf-poppler** - PDF cover extraction functionality
- **HTML/CSS/JavaScript** - Standard web technologies

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/WorldReaderFrontend.git
   cd WorldReaderFrontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_MAP_API_KEY=your_map_api_key
   ```

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**

   Navigate to `http://localhost:3000`

## 📁 Project Structure

```markdown
src
├── components # Reusable components
├── pages # Page components
├── App.js # Main app component
├── index.js # Entry point
└── ... # Other files and folders
```

## 📸 Screenshots

### Home Page

![Home Page Screenshot](./screenShots/Screenshot%202025-03-02%20202142.png)
![Home Page Dark Screenshot](./screenShots/Screenshot%202025-03-02%20202147.png)

### Store Page

![Store Page Screenshot](./screenShots/Screenshot%202025-03-02%20201945.png)
![Store Page Dark Screenshot](./screenShots/Screenshot%202025-03-02%20201950.png)

### Library Page

![Library Page Empty Screenshot](./screenShots/Screenshot%202025-03-02%20202002.png)
![Library Page Screenshot](./screenShots/Screenshot%202025-03-02%20202037.png)
![Library Page Dark Screenshot](./screenShots/Screenshot%202025-03-02%20202048.png)

### Map Page

![Map Page Screenshot](./screenShots/Screenshot%202025-03-02%20201934.png)

### Profile Page

![Profile Page Screenshot](./screenShots/Screenshot%202025-03-02%20202127.png)
![Profile Page Screenshot](./screenShots/Screenshot%202025-03-02%20202121.png)

### Upload Book Page

![Upload Book Page Screenshot](./screenShots/Screenshot%202025-03-02%20202133.png)
![Upload Book Dark Page Screenshot](./screenShots/Screenshot%202025-03-02%20202101.png)

### Login Page

![Login Page Screenshot](./screenShots/Screenshot%202025-03-02%20201839.png)
![Login Page Dark Screenshot](./screenShots/Screenshot%202025-03-02%20201854.png)

### Sign Up Page

![Sign Page Screenshot](./screenShots/Screenshot%202025-03-02%20201907.png)
![Sign Page Dark Screenshot](./screenShots/Screenshot%202025-03-02%20201914.png)

### Admin Login

![Admin Login Page Screenshot](./screenShots/Screenshot%202025-03-02%20234859.png)

### Admin Dashboard Page

![admin dashboard Page Screenshot](./screenShots/Screenshot%202025-03-02%20234917.png)
![Page Screenshot](./screenShots/Screenshot%202025-03-02%20234928.png)
![Page Screenshot](./screenShots/Screenshot%202025-03-02%20234937.png)
