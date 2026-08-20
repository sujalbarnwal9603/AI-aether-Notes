# Aether AI

> **Think. Write. Organize. Ask AI.**

Aether AI is a modern, AI-powered note-taking application designed to help users create, organize, search, and interact with their notes in a clean and distraction-free environment.

The project is being built with a **MERN stack**, with the frontend developed first and the backend planned separately.

---

## ✨ Features

* 📝 Create and edit notes
* 🔍 Search notes quickly
* ⭐ Favorite important notes
* 📦 Archive notes
* 🏷️ Organize notes with tags
* 🤖 AI-powered note interaction
* 💬 AI assistant interface
* ⚡ Command palette with keyboard shortcuts
* 📱 Fully responsive interface
* 🎨 Minimal Nothing OS-inspired design
* 🌙 Pure black dark interface
* ✨ Smooth animations and micro-interactions

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Vite**
* **JavaScript**
* **Tailwind CSS v4**
* **React Router DOM**
* **Framer Motion**
* **Lucide React**
* **Axios**

### Backend — Planned

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **AI API integration**

---

## 🎨 Design System

Aether AI follows a minimal, futuristic aesthetic inspired by **Nothing OS**.

### Colors

```text
Primary Background: #000000
```

The interface primarily uses monochrome colors with subtle borders, contrast, and glow effects.

### Typography

| Purpose          | Font              |
| ---------------- | ----------------- |
| Headings         | Space Grotesk     |
| UI / Body        | Plus Jakarta Sans |
| Code / Technical | JetBrains Mono    |

---

## 📂 Project Structure

```text
aether-ai/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── notes/
│   │   ├── ai/
│   │   └── layout/
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Notes.jsx
│   │   ├── NoteEditor.jsx
│   │   ├── Favorites.jsx
│   │   ├── Archived.jsx
│   │   ├── Search.jsx
│   │   ├── AIAssistant.jsx
│   │   └── Settings.jsx
│   │
│   ├── layouts/
│   │
│   ├── data/
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd aether-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 📱 Application Routes

```text
/                   → Landing Page
/login              → Login
/register           → Register

/app                → Dashboard
/app/notes          → All Notes
/app/notes/:id      → Note Editor
/app/favorites      → Favorite Notes
/app/archived       → Archived Notes
/app/search         → Search
/app/ai             → AI Assistant
/app/settings       → Settings
```

---

## 🤖 AI Features

The frontend currently uses **mock AI interactions**.

Planned AI capabilities include:

* Summarize notes
* Improve writing
* Fix grammar
* Expand ideas
* Generate ideas
* Ask questions about notes
* Generate content from prompts
* Search notes using natural language

The actual AI functionality will be connected during backend development.

---

## 🔌 Backend Integration

The frontend is intentionally designed to work independently from the backend.

API communication will be handled through:

```text
src/services/api.js
```

The planned architecture is:

```text
React Frontend
      │
      │ Axios
      ▼
Express.js API
      │
      ├── Authentication
      ├── Notes
      ├── Search
      ├── AI
      └── Users
      │
      ▼
MongoDB
```

---

## 🗺️ Development Roadmap

### Phase 1 — Frontend

* [x] Project setup
* [x] UI design
* [x] Landing page
* [x] Authentication UI
* [x] Dashboard
* [x] Notes interface
* [x] Note editor
* [x] Search interface
* [x] AI assistant UI
* [x] Settings
* [x] Responsive design
* [ ] Final UI polish

### Phase 2 — Backend

* [ ] Node.js setup
* [ ] Express server
* [ ] MongoDB connection
* [ ] Mongoose models
* [ ] User authentication
* [ ] JWT authorization
* [ ] Notes API
* [ ] Tags and folders API
* [ ] Search API
* [ ] Favorites and archive API

### Phase 3 — AI Integration

* [ ] AI API integration
* [ ] Note summarization
* [ ] AI writing assistant
* [ ] Note-based Q&A
* [ ] AI search
* [ ] Context-aware conversations

### Phase 4 — Production

* [ ] Error handling
* [ ] Security improvements
* [ ] Performance optimization
* [ ] Testing
* [ ] Deployment
* [ ] Production environment configuration

---

## 🔐 Environment Variables

Frontend environment variables will be added when backend integration begins.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit `.env` files containing secrets.

---

## 🧑‍💻 Development Philosophy

Aether AI focuses on:

* **Simplicity**
* **Speed**
* **Minimalism**
* **Good UX**
* **Reusable components**
* **Clean architecture**
* **AI-assisted productivity**

The goal is to make note-taking feel **fast, intelligent, and effortless**.

---

## 📌 Project Status

**Current Status:** 🚧 Frontend Development

The frontend is being developed first using mock data. Backend services and AI functionality will be integrated in later development phases.

---

## 👨‍💻 Author

**Sujal Barnwal**

Built as a personal full-stack project to explore modern web development, AI integration, and scalable application architecture.

---

## 📄 License

This project is currently intended for educational and personal development purposes.
