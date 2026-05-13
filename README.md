# Mini Jira — Task Management Board

A simplified Kanban-style issue tracker inspired by Jira, built as a frontend internship assignment.

## Live Demo
[]

## Features

### Core
- Kanban board with three columns — Todo, In Progress, Done
- Create, edit, and delete tasks
- Drag and drop tasks across columns and reorder within the same column
- Task cards display title, priority (Low / Medium / High), and assignee

### Additional
- Filter tasks by priority
- Filter tasks by assignee
- Board state persists on page refresh via localStorage
- Undo last action (move, edit, delete, create)

## Tech Stack

- ReactJS
- Tailwind CSS
- @hello-pangea/dnd — drag and drop
- react-icons — icons

## Getting Started

```bash
git clone <your-repo-link>
cd mini-jira
npm install
npm run dev
```

## Approach

- `useBoard.js` acts as the single source of truth for all board state
- Filters are applied only at display level — actual board data is never mutated by filters, which ensures drag and drop works correctly even when filters are active
- Undo is implemented using a history stack — before every action the current board state is saved, and undo restores the last saved state
- localStorage persistence is handled via a custom `useLocalStorage` hook that works exactly like `useState` but saves to the browser automatically

## Trade-offs

- Used localStorage instead of a backend — data is browser-specific and clears if browser storage is cleared
- Undo history resets on page refresh — not persisted to localStorage
- No user authentication — single user only

## What I Would Improve With More Time

- Add due dates to tasks
- Add drag handle icon on task cards
- Persist undo history in localStorage

