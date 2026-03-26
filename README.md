# NeuroNest

An AI-powered study companion built with React to help students organize subjects, manage tasks, track progress, and revise efficiently.

## Features

- **Dashboard** — Overview of subjects, completed & pending tasks, and recent activity
- **Subjects & Topics** — Create subjects and add topics under each one
- **Tasks** — Create tasks linked to subjects with priority levels (Low / Medium / High) and toggle completion status
- **Revision** — Flag tasks for revision, filter by subject, and track revision progress
- **LocalStorage Persistence** — All data is saved locally and survives page refreshes

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | React 19 + Vite 8                   |
| Styling   | Tailwind CSS v4                     |
| Routing   | React Router v7                     |
| State     | React Context API + LocalStorage    |
| HTTP      | Axios (for upcoming AI integration) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── App.jsx                  # Router & route definitions
├── main.jsx                 # Entry point
├── index.css                # Tailwind imports
├── components/
│   └── Navbar.jsx           # Navigation bar
├── context/
│   └── StudyContext.jsx      # Global state with localStorage persistence
└── pages/
    ├── Dashboard.jsx         # Stats & recent tasks
    ├── Subjects.jsx          # Subject & topic management
    ├── Tasks.jsx             # Task creation & status tracking
    ├── Revision.jsx          # Revision list & filtering
    └── AITools.jsx           # AI features (coming soon)
```

## Roadmap

- [ ] AI-powered summary generation
- [ ] Search & filter tasks
- [ ] Form validation with react-hook-form
- [ ] Toast notifications
- [ ] Task deadlines
