# Smart Issue Board

A lightweight issue tracking web application built using **React**, **Firebase**, and **Tailwind CSS**.  
The application allows multiple authenticated users to collaboratively create, view, and manage issues with controlled status transitions.

---

## 🚀 Live Demo

👉 Deployed on Vercel:  
`<PASTE YOUR VERCEL URL HERE>`

---

## ✨ Features

- 🔐 **Authentication**
  - Email & Password login/signup using Firebase Authentication
- 📝 **Issue Management**
  - Create issues with title, description, priority, and assignee
  - All issues are created in an **Open** state by design
- 🔄 **Status Workflow**
  - Issues can move from:
    - Open → In Progress → Done
  - Direct Open → Done transitions are intentionally blocked
- 🧠 **Smart Detection**
  - Warns users when creating an issue with a similar title
- 🔍 **Filtering**
  - Filter issues by status and priority
- 👥 **Collaborative Board**
  - All authenticated users can view and manage issues (team-style board)
- 🎨 **UI**
  - Responsive UI built with Tailwind CSS

---

## 🧠 Design Decisions

- **Default Status = Open**  
  All new issues start as `Open` to maintain workflow integrity. Status changes are explicitly handled after creation.

- **Shared Issue Board**  
  The app simulates a real-world team issue tracker where all users can see and collaborate on issues.

- **Client-Side Validation + Firestore Rules**  
  Status transition rules are enforced at the UI level and can be further secured using Firestore security rules.

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Backend / Auth:** Firebase Authentication
- **Database:** Firebase Firestore
- **Deployment:** Vercel

---

## 📁 Project Structure

smart-issue-board/
├── public/
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── firebase.js
│ ├── index.css
│ └── assets/
├── index.html
├── .env
├── .gitignore
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md

yaml
Copy code

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
⚠️ These variables must also be added in Vercel → Project Settings → Environment Variables

▶️ Run Locally
bash
Copy code
npm install
npm run dev
Open: http://localhost:5173

🧪 Test Credentials (Example)
graphql
Copy code
Email: test.issue.board@gmail.com
Password: test@123
📦 Deployment
The project is deployed on Vercel with:

npm run build

Output directory: dist

Firebase domain added to authorized domains