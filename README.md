# Reel-Feed Integration

A full-stack food application with a short-video reel feed (Instagram Reels / TikTok style), allowing users to discover food items, like, save, and comment on them, and visit food partner stores.

---

## ✨ Features

- 🎥 **Video Reel Feed** — Scroll through short food videos, auto-play/pause on scroll using Intersection Observer
- 🎰 **Video uploadation** — register foodPartner can upload the video and register user can watch 
- ❤️ **Like System** — Like/unlike food items with real-time count updates
- 💬 **Comments** — View and post comments per food reel, fetched from the database on panel open
- 🔖 **Save / Bookmark** — Save food items to your personal list
- 🏪 **Food Partner Pages** — Visit the store page of the food partner for each reel
- 🔐 **Authentication** — JWT-based auth with cookie sessions (protected routes for actions)
- 📱 **Responsive** — Mobile-first layout

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework & build tool |
| React Router DOM | Client-side routing |
| Axios | HTTP requests with cookie support |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication tokens |
| Cookie-based Sessions | Persistent login state |
| Multer | File/video uploads |

### Storage
| Service | Purpose |
|---|---|
| ImageKit | Video & image hosting/CDN |
| MongoDB Compass / Local | Database |

---

## 📁 Project Structure

```
Backend zomato reel feed/
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js
            ├── food.controllers.js
│       │   └── foodPartner.controllers.js
│       ├── db/ 
            └── db.js
│       ├── middlewares/
│       │   └── auth.middleware.js
            
│       ├── models/
│       │   ├── comment.js
│       │   ├── food.model.js
│       │   ├── foodPartner.model.js
│       │   ├── like.model.js
│       │   ├── save.model.js
│       │   └── user.model.js
│       ├── routers/
│       │   ├── auth.routers.js
│       │   ├── food-partner.routes.js
│       │   └── food.routers.js
│       └── app.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── assets/
        ├── components/
        │   ├── BottomNav.jsx
        │   └── BottomNav.css
        └── pages/
            └── general/
                └── Home.jsx
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- ImageKit account (for video hosting)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Sahil-Raj75/Zomato-reel-feed-aggregreator.git
cd Zomato-reel-feed-aggregreator
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/food-delivery-app
JWT_SECRET=your_jwt_secret_here
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

Backend runs on `http://localhost:3000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔌 API Overview

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT cookie |
| POST | `/api/auth/logout` | Clear session |

### Food
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/food/` | User | Get all food reels |
| POST | `/api/food/` | Food Partner | Upload a new food reel |
| POST | `/api/food/like` | User | Like / unlike a food item |
| POST | `/api/food/save` | User | Save / unsave a food item |
| GET | `/api/food/save` | User | Get saved food items |
| POST | `/api/food/comment` | User | Post a comment |
| GET | `/api/food/comment/:id` | User | Get comments for a food item |

---

## 🚀 Future Improvements

- [ ] User profile pages
- [ ] Search & filter by food category
- [ ] Push notifications for likes/comments
- [ ] Food Partner dashboard with analytics
- [ ] Order & delivery flow

---

## 👤 Author

**Sahil Raj**  
GitHub: [@Sahil-Raj75](https://github.com/Sahil-Raj75)  
LeetCode: [Sahil75](https://leetcode.com/Sahil75)

---

> _Built as a full-stack placement project — Express.js +  React + Node.js + MongoDB_
