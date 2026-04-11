# 🚀 Skill Marketplace

A full-stack MERN application that allows users to add, explore, and manage service listings. The platform supports authentication, CRUD operations, and persistent cloud storage.

## 🔥 Features
- User Authentication (Login / Signup)
- Add Service Listings
- Delete Services (Owner/Admin only)
- Search Services by Title
- Filter Services by Price
- Admin Privileges for full control
- Persistent Data using MongoDB Atlas
- Fully Deployed (Frontend + Backend)

## 🛠️ Tech Stack

Frontend:
- React.js
- Bootstrap
- Axios

Backend:
- Node.js
- Express.js

Database:
- MongoDB Atlas

Deployment:
- Vercel (Frontend)
- Render (Backend)

## 🌐 Live Links
- Frontend: https://skill-marketplace-pi.vercel.app  
- Backend: https://skill-marketplace-n8j5.onrender.com  

## ⚙️ Installation & Setup

Clone Repository:
git clone https://github.com/Astitvaa27/skill-marketplace.git  
cd skill-marketplace  

Backend Setup:
cd server  
npm install  

Create `.env` file in server folder and add:
MONGO_URI=your_mongodb_connection_string  

Run backend:
node index.js  

Frontend Setup:
cd client  
npm install  
npm start  

## 📦 API Endpoints

Auth Routes:
POST /signup → Register user  
POST /login → Login user  

Service Routes:
GET /services → Fetch all services  
POST /services → Add new service  
DELETE /services/:id → Delete service  

## 🔐 Environment Variables
Create `.env` inside `/server`:
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/skillDB  

## 🧠 Key Concepts Used
- REST API Development  
- CRUD Operations  
- Authentication Logic  
- React State Management  
- Axios API Integration  
- Cloud Database (MongoDB Atlas)  

## 🚀 Deployment

Frontend (Vercel):
- Connected GitHub repo  
- Auto deploy on push  

Backend (Render):
- Environment variable setup (MONGO_URI)  
- Manual/auto deploy  

## ⚠️ Notes
- Ensure MongoDB Atlas allows access (0.0.0.0/0)  
- Do not commit `.env` file  
- Backend must be running for frontend to work  

## 👨‍💻 Author
Astitva Mhatre  

## ⭐ Acknowledgements
MongoDB Atlas  
Vercel  
Render  
Bootstrap  

## 📌 Future Improvements
- Edit Service Feature  
- Image Upload (Cloudinary)  
- Payment Integration  
- Advanced UI  

## 🎉 Project Status
Fully Functional  
Deployed  
Resume Ready

© 2026 Astitva Mhatre. All rights reserved.
