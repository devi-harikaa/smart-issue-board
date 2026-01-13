# Smart Issue Board

A lightweight issue tracking web application built using **React**, **Firebase**, and **Tailwind CSS**.  
The application allows multiple authenticated users to collaboratively create, view, and manage issues with controlled status transitions.

---

## 🚀 Live Demo

👉 Deployed on Vercel:  
`<(https://smart-issue-board-six.vercel.app/)>`

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

```text
smart-issue-board/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   ├── firebase.js
│   └── index.css
├── index.html
├── .env
├── .gitignore
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md

```
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


```

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

🧠 Technical Decisions & Reflections
1️⃣ Why did you choose the frontend stack?

React was chosen for its component-based architecture and ecosystem maturity.

Vite provides fast startup and hot module replacement, ideal for rapid development.

Tailwind CSS enables consistent styling with minimal custom CSS, speeding up UI work.

The stack is modern, lightweight, and suitable for real-time Firebase-backed apps.

2️⃣ Firestore Data Structure

Firestore uses a flat collection-based structure:
'''
issues (collection)
 └── issueId (document)
     ├── title: string
     ├── description: string
     ├── priority: "Low" | "Medium" | "High"
     ├── status: "Open" | "In Progress" | "Done"
     ├── assignedTo: string
     ├── createdBy: string (user email)
     └── createdAt: timestamp

'''
Real-time updates are handled using onSnapshot.

Issues are ordered by createdAt for newest-first display.

Authentication data is handled separately via Firebase Auth.

3️⃣ Handling Similar / Duplicate Issues

Before creating a new issue:

Existing issues are fetched from Firestore

Titles are compared using case-insensitive substring matching

If a similar issue is detected, the user receives a warning

The user can choose to cancel or proceed anyway

This reduces duplicates while preserving user control.

4️⃣ What Was Challenging?

Correctly configuring Firebase Authentication and Firestore rules

Managing environment variables across local and Vercel deployments

Handling authentication state and Firestore listeners together without race conditions

These were resolved through incremental testing and clear separation of concerns.

5️⃣ What Would Be Improved Next?

Given more time, the following enhancements would be added:

Role-based access control (Admin vs User)

Full-text search instead of simple title matching

Issue comments and activity logs

Pagination for large issue lists

Better UI feedback for loading and error states

📌 Notes

Multiple users can log in and see the same shared issue board.

Status cannot move directly from Open → Done by design.

Firebase credentials are intentionally excluded from version control.

📜 License

This project was built as part of an interview assignment and is intended for evaluation purposes.
