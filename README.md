
# Solana_Backend
=======
# 🌐 Solana Backend – RESTful API (MERN Internship Practice)

This backend API system was developed for the **Solana Dummy Project**, created during my internship using the **MERN stack**. The purpose of this project is to practice building clean, modular, and frontend-friendly APIs so the frontend developer can dynamically consume data without issues.

---

## ⚙️ Tech Stack

- **Node.js** + **Express.js** – Server and routing
- **MongoDB** + **Mongoose** – NoSQL database with schema modeling
- **JWT** – Authentication
- **Multer** – File/image upload
- **Cloudinary** – Media storage
- **dotenv** – Environment config
- **Other tools**: `bcrypt`, `slugify`, `cookie-parser`, `cors`, etc.

---

## 📁 Folder Structure

```
solana-backend/
│
├── config/
│   ├── connectdb.js               # MongoDB connection setup
│   └── cloudinary.js              # Cloudinary config for image uploads
│
├── controllers/
│   ├── authController.js
│   ├── buildGrowthController.js
│   ├── caseStudyController.js
│   ├── companiesListController.js
│   ├── sliderController.js
│   ├── statsController.js
│   └── thrivingCommunityController.js
│
├── middlewares/
│   ├── isAuthenticated.js         # Auth middleware
│   └── upload.js                  # Multer middleware for uploads
│
├── models/
│   ├── authModel.js
│   ├── buildGrowthModel.js
│   ├── caseStudyModel.js
│   ├── companiesListModel.js
│   ├── sliderModel.js
│   ├── statsModel.js
│   └── userModel.js
│
├── routes/                        # All route files linked to controllers
│
├── uploads/
│   ├── community/
│   └── others/
│
├── utils/
│   ├── createCaseStudyLink.js
│   ├── createJWT.js
│   └── uploadImageToCloudinary.js
│
├── .env                           # Environment variables (not committed)
├── .env.example                   # Sample .env structure
├── package.json
├── package-lock.json
└── server.js                      # App entry point
```

---

## 🚀 Getting Started

### 🛠️ Install Dependencies

Make sure you have Node.js and MongoDB installed.

```bash
npm install
```

### 📡 Run the Development Server

```bash
npm run dev
```

> Make sure to create a `.env` file in the root directory by copying `.env.example`.

---

## 🔐 Auth Features

- Register and login endpoints
- JWT-based authentication
- Cookie support with secure token
- Middleware for protected routes

---

## 📦 APIs Available (Short Overview)

| Feature              | Endpoint                           | Method |
| -------------------- | ---------------------------------- | ------ |
| Register/Login       | `/api/auth/signup`                 | POST   |
|                      | `/api/auth/login`                  | POST   |
| Password Reset       | `/api/auth/password/reset-request` | POST   |
|                      | `/api/auth/password/reset-verify`  | POST   |
| Password Update      | `/api/auth/password/update`        | POST   |
| Email Change         | `/api/auth/email/change-request`   | POST   |
|                      | `/api/auth/email/change-verify`    | POST   |
| Build Growth Section | `/api/build-growth/`               | CRUD   |
| Case Studies         | `/api/case-study/`                 | CRUD   |
| Companies List       | `/api/company-list/`               | CRUD   |
| Sliders              | `/api/slider/`                     | CRUD   |
| Statistics           | `/api/stats/`                      | CRUD   |
| Community Section    | `/api/community/`                  | CRUD   |

> For full API usage, please use the Postman collection or contact the backend team.

---

## 🧠 Author’s Note

> 💡 _Built with clarity and scalability in mind to make frontend integration smooth._

---

## 🧾 License

This project is maintained as part of a MERN Stack internship (practice project).
