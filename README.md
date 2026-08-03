# Kanban Task Management Web App

A full-stack, modern Kanban task management application built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **PostgreSQL**, and **Better Auth**.

---

## 🚀 Features

- **📋 Board Management**: Create, edit, switch between, and delete customizable task boards.
- **🔄 Drag-and-Drop Workflow**: Smooth drag-and-drop support for reordering tasks and columns.
- **✅ Task & Subtask Tracking**: Detailed task dialogs allowing users to add descriptions, check off subtasks, and move tasks between columns.
- **🔐 Secure Authentication**: User registration and login powered by `better-auth` with PostgreSQL session storage.
- **🌙 Dark & Light Themes**: Full dark/light mode toggle with theme persistence.
- **🎨 Modern UI & Accessibility**: Beautiful design built with shadcn/ui, Lucide icons, and Tailwind CSS v4.
- **⚡ Toast Notifications**: Instant visual feedback for user actions.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components & UI**: [Radix UI Primitives](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Drag & Drop**: [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.si/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

### Backend & Database

- **Database**: PostgreSQL
- **ORM**: [Prisma ORM 7](https://www.prisma.io/) with `@prisma/adapter-pg`
- **Authentication**: [Better Auth](https://www.better-auth.com/)

---

## 📁 Project Structure

```text
kanban-app/
├── app/                  # Next.js App Router (pages, API routes, auth routes, layouts)
│   ├── (auth)/           # Authentication pages (login, register)
│   ├── api/              # API endpoints
│   └── boards/           # Board routes & task views
├── components/           # UI components & shared components
│   └── ui/               # Reusable Radix / Tailwind UI components
├── features/             # Feature-based domain modules
│   ├── auth/             # Auth-related features & forms
│   ├── boards/           # Board management components & logic
│   └── tasks/            # Task modal, creation, drag-and-drop logic
├── lib/                  # Shared utilities, Prisma client, auth setup
├── prisma/               # Database schema, migrations & seed scripts
│   ├── schema.prisma     # Prisma database schema definition
│   └── seed.ts           # Initial sample data seed script
└── public/               # Static assets & icons
```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** v20+ or **Bun** / **pnpm** / **yarn**
- **PostgreSQL** instance running locally or hosted (e.g., Supabase, Neon, Docker)

---

### 1. Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>
cd kanban-app

# Install dependencies using your preferred package manager
bun install
```

---

### 2. Environment Setup

Create a `.env` file in the project root and specify your database connection string and authentication secrets:

```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-super-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

---

### 3. Database Migration & Setup

Apply database migrations and generate the Prisma client:

```bash
# Push schema changes to your database
bunx prisma db push

# Generate Prisma Client
bunx prisma generate

# (Optional) Seed the database with sample boards & tasks
bunx prisma db seed
```

---

### 4. Running the Development Server

Start the local development server:

```bash
bun run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command         | Description                                                   |
| :-------------- | :------------------------------------------------------------ |
| `bun run dev`   | Runs the Next.js app in development mode with live reloading. |
| `bun run build` | Builds the optimized production build of the application.     |
| `bun run start` | Starts the production server after building.                  |
| `bun run lint`  | Runs ESLint to check for code style & static analysis issues. |
