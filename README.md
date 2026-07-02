# 📝 ThinkHub — Community Blog Web Application

> A full stack blog platform where anyone can sign up, explore topics and share their thoughts with the world.

![ThinkHub Banner](https://img.shields.io/badge/ThinkHub-Community%20Blog-6C63FF?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🌐 Live Demo

🔗 **Frontend:** [thinkhub-shareyourinsights.netlify.app](https://thinkhub-a-community-blog-web.onrender.com/)  

---

## 📌 About The Project

**ThinkHub** is a community blog web application developed during my **Web Developer Internship at Codec Technologies Pvt. Ltd.**

The idea was simple — build a platform where anyone can come, sign up and share their thoughts on topics they care about. No complicated setup, no cluttered interface — just a clean and simple blog platform.

Users can explore **14 different topic categories** like Tech, Health, AI, Cooking, Finance, Music and more — and contribute their own posts to any topic.

---

## ✨ Features

- 🔐 **User Signup** — Register with Name, Email and Age
- 🏠 **Home Page** — 14 topic circles to explore
- ✍️ **Add Blog Post** — Write and publish posts under any topic
- 👁️ **Full Screen View** — Click any post to read in full screen
- 🗑️ **Delete Post** — Remove posts you no longer need
- 📱 **Responsive Design** — Works on desktop and mobile
- 🔗 **React Router** — Smooth navigation without page reloads
- 💾 **MongoDB Storage** — All data saved permanently in database

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Routing | React Router DOM |
| Deployment | Netlify (Frontend) |
| Version Control | Git, GitHub |

---

## 📁 Project Structure

```
ThinkHub – Blog Web Application/
│
├── backend/                  # Node.js + Express Backend
│   ├── models/
│   │   ├── User.js           # User schema (name, email, age)
│   │   └── Post.js           # Post schema (title, desc, topic, date)
│   ├── routes/
│   │   ├── userRoute.js      # POST /api/users/signup
│   │   └── postRoute.js      # POST, GET, DELETE /api/posts
│   ├── .env                  # MongoDB URI and PORT
│   └── server.js             # Main server file
│
└── Thinkhub/                 # React Frontend
    └── src/
        ├── App.jsx            # Routes setup
        ├── Signup.jsx         # Signup page
        ├── Home.jsx           # Home page with topic circles
        ├── Topic.jsx          # Topic page with posts
        ├── About.jsx          # About page
        └── Contact.jsx        # Contact page
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed locally or MongoDB Atlas account

### Installation

**1. Clone the repo:**
```bash
git clone https://github.com/DineshKumar-02/ThinkHub-Blog-App.git
cd ThinkHub-Blog-App
```

**2. Setup Backend:**
```bash
cd backend
npm install
```

Create a `.env` file inside backend:
```
MONGO_URI= localhost/projectname/
PORT= mongdbportdefualtport
```

Run backend:
```bash
node server.js
```

**3. Setup Frontend:**
```bash
cd Thinkhub
npm install
npm run dev
```

**4. Open browser:**
```
http://localhost:5173 
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/users/signup | Register new user |
| POST | /api/posts/add | Add new blog post |
| GET | /api/posts/:topic | Get posts by topic |
| DELETE | /api/posts/:id | Delete a post |

---

## 📸 Screenshots

> Signup Page · Home Page · Topic Page · MongoDB Compass

<img width="1919" height="1018" alt="log in page" src="https://github.com/user-attachments/assets/07dd9e18-509e-40e7-a9c9-0076281ffa25" />
<img width="1919" height="1018" alt="Main page topics" src="https://github.com/user-attachments/assets/c2cfee0b-4228-4ba1-bee8-a13cd0c983a0" />
<img width="1919" height="1016" alt="topic post" src="https://github.com/user-attachments/assets/7388fac2-336c-4c0a-93c9-608a15d2e459" />
<img width="1919" height="1019" alt="mongodb" src="https://github.com/user-attachments/assets/11d7ee0c-8726-4367-b37a-21a8bb6b10af" /> 


---

## 🎯 What I Learned

- How a full stack MERN application works end to end
- Building and connecting REST APIs between frontend and backend
- Managing real data in MongoDB using Mongoose
- React Router DOM for client-side navigation
- Git version control and GitHub for project management
- Deploying a live project on Netlify

---

## 👨‍💻 Developer

**DineshKumar S**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/dinesh45)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DineshKumar-02)
[![Portfolio](https://img.shields.io/badge/Portfolio-6C63FF?style=for-the-badge&logo=google-chrome&logoColor=white)](https://dineshkumar-portfolio2706.netlify.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
