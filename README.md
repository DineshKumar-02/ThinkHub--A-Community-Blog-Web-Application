# 📝 ThinkHub — Community Blog Web Application

> A modern, full-stack blogging platform where anyone can register, explore a wide range of topics, and share their thoughts with the world.

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](#)

</div>

---

## 🌐 Live Demo & Deployment Links

* 🔗 **Frontend Site:** [thinkhub-shareyourinsights.netlify.app](https://thinkhub-shareyourinsights.netlify.app)
* 🔗 **Backend API:** [thinkhub-a-community-blog-web-application.onrender.com](https://thinkhub-a-community-blog-web-application.onrender.com/)

---

## 📌 About The Project

**ThinkHub** is a responsive full-stack MERN blogging application developed during a **Web Developer Internship at Codec Technologies Pvt. Ltd.** 

The goal was to design a clean, distraction-free space for sharing knowledge and insights. Users can register instantly, explore **14 specialized topic categories**, publish posts with rich text, and delete posts they no longer wish to share. 

---

## 🎨 14 Blog Topic Channels

Discover and contribute to the following categories:

| Category | Emoji | Category | Emoji |
| :--- | :--- | :--- | :--- |
| **Lifestyle** | 🧘 | **Movie Reviews** | 🎥 |
| **Health** | ❤️ | **Music** | 🎵 |
| **Fitness** | 💪 | **Podcast Reviews** | 🎙️ |
| **Tech** | 💻 | **Investments** | 📈 |
| **AI** | 🤖 | **Money** | 💰 |
| **Cooking** | 🍳 | **Finance** | 🏦 |
| **Entertainment** | 🎬 | **Jokes** | 😂 |

---

## ✨ Features

* 🔐 **User Registration:** Simple signup collecting Name, Email, and Age, validated to ensure users are 13+.
* 🏠 **Interactive Feed:** Browse, click, and inspect individual posts inside 14 topic-specific circles.
* ✍️ **Instant Publishing:** Write and publish post titles and descriptions to any chosen topic.
* 👁️ **Full-Screen Reader:** Click on any post card to read the full content in a centered, clean layout.
* 🗑️ **Post Removal:** Delete posts directly from the topic feed with simple UI actions.
* 📱 **Responsive Design:** Optimized CSS grid and flex layouts for flawless rendering on mobile, tablet, and desktop.
* 🔗 **SPA Experience:** Fluid navigation using React Router DOM for zero-refresh page switches.
* 💾 **Secure & Persistent Database:** Safe storage of user profiles and posts with MongoDB.

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React (v19) | Component-based interactive UI |
| **Routing** | React Router DOM (v7) | Fast, client-side routing & page navigation |
| **Backend** | Node.js, Express.js | Robust server routing & REST API endpoints |
| **Database** | MongoDB, Mongoose ODM | Document storage, validation schemas & relationships |
| **Deployment** | Netlify & Render | Modern web and server hosting environments |
| **Tools** | Git, Postman, Vite | Development environment and API testing |

---

## 📁 Project Directory Structure

```text
ThinkHub--A-Community-Blog-Web-Application/
│
├── backend/                  # Node.js + Express Backend Service
│   ├── models/               # MongoDB Document Schemas
│   │   ├── User.js           # User schema (Name, Email, Age validation)
│   │   └── Post.js           # Blog Post schema (Title, Description, Topic, Date)
│   ├── routes/               # Express App Routing handlers
│   │   ├── userRoute.js      # Endpoint: /api/users/signup
│   │   └── postRoute.js      # Endpoints: GET, POST, DELETE /api/posts
│   ├── .env                  # Environment configurations (Port & MongoDB URI)
│   └── Server.js             # Server startup and MongoDB integration
│
└── ThinkHub/                 # Vite + React Frontend Interface
    ├── public/               # Static assets
    └── src/                  # React Application Codebase
        ├── assets/           # Media & static assets
        ├── App.jsx           # Application routing definition
        ├── Signup.jsx        # Signup Page component
        ├── Home.jsx          # Hub dashboard with topic channels
        ├── Topic.jsx         # Post feed page for individual topics
        ├── About.jsx         # Information page
        ├── Contact.jsx       # User contact page
        ├── config.js         # API Base URLs configuration
        ├── index.css         # Global base styles & reset
        ├── App.css           # Grid layouts & page component styles
        └── main.jsx          # React app DOM entrypoint
```

---

## 🚀 Getting Started

### 📋 Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** or **yarn**
* **MongoDB Local Installation** or a **MongoDB Atlas Database Connection**

### ⚙️ Installation & Configuration

#### 1. Clone the Repository
```bash
git clone https://github.com/DineshKumar-02/ThinkHub-Blog-App.git
cd ThinkHub-Blog-App
```

#### 2. Set Up the Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in the `backend` folder:
   ```env
   # Local Database Setup
   MONGO_URI=mongodb://localhost:27017/thinkhub
   PORT=5000
   ```
3. Start the backend server:
   ```bash
   node Server.js
   ```
   *(Expected log: `MongoDB Connected!` & `Server running on port 5000`)*

#### 3. Set Up the Frontend
1. In a new terminal window, navigate to the `ThinkHub` directory:
   ```bash
   cd ThinkHub
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173` to explore the app.

---

## 📡 API Endpoints & Usage

### 🔐 User Authentication

#### `POST /api/users/signup`
Creates a new user profile.
* **Payload Format:** JSON
* **Request Schema:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "age": 20
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Signup successful",
    "user": {
      "_id": "64fb32c...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "age": 20
    }
  }
  ```
* **Validation:** All inputs are required; the user's age must be >= 13.

---

### ✍️ Blog Posts Management

#### `POST /api/posts/add`
Publishes a new post under a specific topic channel.
* **Payload Format:** JSON
* **Request Schema:**
  ```json
  {
    "title": "Unlocking AI potential",
    "desc": "How modern LLMs are reshaping software engineering.",
    "topic": "AI"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "post": {
      "_id": "64fb32d...",
      "title": "Unlocking AI potential",
      "desc": "How modern LLMs are reshaping software engineering.",
      "topic": "AI",
      "date": "2026-07-02T17:30:00.000Z"
    }
  }
  ```

#### `GET /api/posts/:topic`
Retrieves all posts published under a specific topic channel.
* **Request Param:** `topic` (e.g. `Tech`, `AI`, `Cooking`)
* **Response (200 OK):**
  ```json
  [
    {
      "_id": "64fb32d...",
      "title": "Unlocking AI potential",
      "desc": "...",
      "topic": "AI",
      "date": "2026-07-02T17:30:00.000Z"
    }
  ]
  ```

#### `DELETE /api/posts/:id`
Deletes a blog post by its unique DB ID.
* **Request Param:** `id` (MongoDB ObjectID)
* **Response (200 OK):**
  ```json
  {
    "success": true
  }
  ```

---

## 📸 Screenshots

> Signup Page · Home Page · Topic Page · MongoDB Compass

<img width="1919" height="1018" alt="log in page" src="https://github.com/user-attachments/assets/07dd9e18-509e-40e7-a9c9-0076281ffa25" />
<img width="1919" height="1018" alt="Main page topics" src="https://github.com/user-attachments/assets/c2cfee0b-4228-4ba1-bee8-a13cd0c983a0" />
<img width="1919" height="1016" alt="topic post" src="https://github.com/user-attachments/assets/7388fac2-336c-4c0a-93c9-608a15d2e459" />
<img width="1919" height="1019" alt="mongodb" src="https://github.com/user-attachments/assets/11d7ee0c-8726-4367-b37a-21a8bb6b10af" /> 

---

## 🎯 Key Learning Outcomes

During the build process, the following technical goals were met:
* **End-to-End MERN Architecture:** Developed a clear understanding of the full lifecycle of data moving between React, Node/Express, and MongoDB.
* **API Design & Validation:** Created REST API endpoints with robust Express validators and Mongoose validation rules.
* **State & Navigation Control:** Leveraged React Router DOM for routing configurations, ensuring consistent views without page reloads.
* **Database Management:** Used Mongoose ODM for queries, deletion routines, and mapping connections safely.
* **Vite Tooling:** Handled project creation and configurations with Vite for optimal developer workflow.

---

## 👨‍💻 Developer Profile

**DineshKumar S**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/dinesh45)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DineshKumar-02)
[![Portfolio](https://img.shields.io/badge/Portfolio-6C63FF?style=for-the-badge&logo=google-chrome&logoColor=white)](https://dineshkumar-portfolio2706.netlify.app)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
