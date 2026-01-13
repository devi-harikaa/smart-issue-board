# Smart Issue Board

Smart Issue Board is a lightweight, collaborative issue-tracking web application built using **React**, **Firebase**, and **Tailwind CSS**.  
It allows multiple authenticated users to create, view, and manage issues with a controlled workflow and real-time updates.

---

## Live Demo

🔗 https://smart-issue-board-six.vercel.app/

---

## 1. Frontend Stack Choice

### React (Vite)
React was chosen for its component-based architecture, which makes the UI modular, reusable, and easy to maintain.  
Vite was used instead of Create React App because it provides faster development startup and hot module replacement.

### Tailwind CSS
Tailwind CSS was used to quickly build a responsive and clean UI without writing large custom CSS files.  
Its utility-first approach allowed faster iteration during development.

### Firebase
Firebase was selected because it provides authentication and a real-time database with minimal backend setup, making it ideal for a collaborative issue board.

### Vercel
Vercel was used for deployment due to its seamless GitHub integration and optimized support for React applications.

---

## 2. Firestore Data Structure

All issues are stored in a single Firestore collection called `issues`.
```text
issues (collection)
└── issueId (document)
├── title: string
├── description: string
├── priority: "Low" | "Medium" | "High"
├── status: "Open" | "In Progress" | "Done"
├── assignedTo: string
├── createdBy: string (email)
└── createdAt: timestamp
```

- Issues are ordered by `createdAt` to show the newest issues first.
- Firestore real-time listeners ensure all users see updates instantly.

---

## 3. Similar Issue Handling

Before creating a new issue:

- Existing issues are fetched from Firestore.
- A case-insensitive comparison is performed on issue titles.
- If a similar title is found:
  - A warning message is displayed.
  - The user can either **confirm** and create the issue anyway or **cancel** and modify the title.

This prevents accidental duplicate issues while still allowing flexibility.

---

## 4. Challenges & Confusing Parts

### Challenges
- Correctly configuring Firebase environment variables with Vite.
- Ensuring Firestore real-time listeners did not trigger unnecessary re-renders.

### Confusing Parts
- Managing local React state alongside Firestore listeners, especially while implementing the similar-issue warning logic.
- Handling authentication errors caused by incorrect environment variable placement.

---

## 5. Future Improvements

If given more time, the following improvements would be implemented:

- NLP-based similarity detection instead of basic string matching.
- Drag-and-drop Kanban-style board for status changes.
- Comments and activity logs for each issue.
- Role-based access control (Admin / User).

---

## Features

- Email & Password authentication
- Create issues with title, description, priority, and assignee
- Controlled workflow: Open → In Progress → Done
- Smart warning for similar issues
- Filter issues by status and priority
- Real-time collaboration across multiple users
- Responsive UI using Tailwind CSS

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


These variables must also be added in **Vercel → Project Settings → Environment Variables**.
```
---

## Run Locally

```bash
npm install
npm run dev
```

<img width="1907" height="979" alt="Screenshot 2026-01-13 212712" src="https://github.com/user-attachments/assets/23c3dd3c-c7de-40fa-8c2c-9e5f82fefc2d" />
<img width="1850" height="937" alt="Screenshot 2026-01-13 210117" src="https://github.com/user-attachments/assets/e4ce4156-87c1-4e54-a3ad-a78f56009d36" />
<img width="1886" height="1133" alt="Screenshot 2026-01-13 205843" src="https://github.com/user-attachments/assets/010db660-0981-4447-b9cf-212fc806e80c" />
<img width="1911" height="998" alt="Screenshot 2026-01-13 205832" src="https://github.com/user-attachments/assets/fcacacf4-5d79-4dff-be28-af10afd2f029" />
<img width="1912" height="1041" alt="Screenshot 2026-01-13 205756" src="https://github.com/user-attachments/assets/6db5f983-927a-4036-988c-e82b8e2851bf" />
<img width="1918" height="1059" alt="Screenshot 2026-01-13 205732" src="https://github.com/user-attachments/assets/f0715122-a855-4f87-a2f3-496ce69dc86d" />
<img width="1892" height="1038" alt="Screenshot 2026-01-13 205613" src="https://github.com/user-attachments/assets/e2d46891-3074-4663-b30b-718262dbf539" />
<img width="1902" height="964" alt="Screenshot 2026-01-13 205554" src="https://github.com/user-attachments/assets/23b64ccd-a629-4156-ab34-fc4a849ccae2" />
<img width="1850" height="937" alt="Screenshot 2026-01-13 210117" src="https://github.com/user-attachments/assets/bdbc9b65-cee1-41cb-b4b8-a17c71401691" />
<img width="1886" height="1133" alt="Screenshot 2026-01-13 205843" src="https://github.com/user-attachments/assets/da506cff-53d6-47a6-8247-d515bdde845b" />
<img width="1911" height="998" alt="Screenshot 2026-01-13 205832" src="https://github.com/user-attachments/assets/3ef2af52-a7fc-4876-bac0-46682de93bbf" />
<img width="1912" height="1041" alt="Screenshot 2026-01-13 205756" src="https://github.com/user-attachments/assets/b25226f2-f835-4ad1-9c84-34914354547d" />
<img width="1918" height="1059" alt="Screenshot 2026-01-13 205732" src="https://github.com/user-attachments/assets/5a05deda-913d-4ebe-93dc-6c71dc96f4bf" />
<img width="1892" height="1038" alt="Screenshot 2026-01-13 205613" src="https://github.com/user-attachments/assets/f5d396a9-ad06-4704-964f-264eaa1ec03a" />
<img width="1902" height="964" alt="Screenshot 2026-01-13 205554" src="https://github.com/user-attachments/assets/bde2ef60-942e-4358-98ef-855588badff0" />
Open: http://localhost:5173

---

## Test Credentials (Example)

Email: test.issue.board@gmail.com
Password: test@123


---

## Notes

- All authenticated users can view and manage the same set of issues.
- Firebase credentials are excluded from version control.
- Built as an interview assignment with emphasis on clarity and correctness.
