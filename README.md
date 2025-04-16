
# Todo App

A simple, efficient Todo application built with Next.js, Prisma, TypeScript, and Tailwind CSS, leveraging the power of TRPC for a seamless API communication experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Setup and Installation](#setup-and-installation)
- [Database Setup](#database-setup)
- [API Routes](#api-routes)
- [Frontend Components](#frontend-components)
- [Running the Project](#running-the-project)
- [License](#license)

## Project Overview

This Todo app allows users to add, edit, delete, and filter tasks. It uses a modern full-stack architecture with **Next.js** for the frontend, **Prisma** for database interaction, and **TRPC** for type-safe API queries. It uses **Tailwind CSS** for styling and **TypeScript** for static typing.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete Todo tasks.
- **User Authentication**: Secure user login using JWT tokens.
- **Filter Todos**: Filter tasks by completion status.
- **Responsive UI**: The app is fully responsive and mobile-friendly.
- **Type-Safe API**: Communication between the frontend and backend is type-safe with **TRPC**.

## Technologies

- **Next.js** (Frontend Framework)
- **TypeScript** (Static Typing)
- **Prisma** (ORM for Database)
- **TRPC** (Type-safe API Communication)
- **Tailwind CSS** (Utility-first CSS Framework)
- **JWT** (JSON Web Tokens for Authentication)

## Folder Structure

Here’s the folder structure of the Todo App:

```
├── README.md
└── todo-app
    ├── .gitignore
    ├── README.md
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── prisma
        ├── migrations
        │   ├── 20250415193425_init
        │   │   └── migration.sql
        │   ├── 20250416043649_make_userid_optional
        │   │   └── migration.sql
        │   ├── 20250416043910_make_userid_required
        │   │   └── migration.sql
        │   └── migration_lock.toml
        └── schema.prisma
    ├── public
        ├── file.svg
        ├── globe.svg
        ├── next.svg
        ├── vercel.svg
        └── window.svg
    ├── src
        ├── components
        │   ├── auth
        │   │   └── AuthForm.tsx
        │   ├── layouts
        │   │   └── Header.tsx
        │   ├── todos
        │   │   ├── FilterButton.tsx
        │   │   ├── TodoForm.tsx
        │   │   ├── TodoItem.tsx
        │   │   └── TodoList.tsx
        │   └── ui
        │   │   ├── Button.tsx
        │   │   └── Input.tsx
        ├── context
        │   └── AuthContext.tsx
        ├── pages
        │   ├── _app.tsx
        │   ├── api
        │   │   └── trpc
        │   │   │   └── [trpc].ts
        │   ├── index.tsx
        │   ├── signin.tsx
        │   └── signup.tsx
        ├── server
        │   ├── context.ts
        │   ├── repositories
        │   │   ├── todoRepository.ts
        │   │   └── userRepository.ts
        │   ├── routers
        │   │   ├── authRouter.ts
        │   │   ├── index.ts
        │   │   └── todoRouter.ts
        │   ├── schemas
        │   │   ├── authenticationSchema.ts
        │   │   └── todoSchema.ts
        │   ├── services
        │   │   └── authService.ts
        │   └── trpc.ts
        ├── styles
        │   └── globals.css
        ├── types
        │   ├── authContext.ts
        │   ├── todo.ts
        │   └── user.ts
        └── utils
        │   ├── curentDate.ts
        │   ├── formateDate.ts
        │   └── trpc.ts
    ├── tailwind.config.js
    └── tsconfig.json

```

## Setup and Installation

To get started with the project, follow these steps:

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (>= 16.0)
- **npm** or **yarn** (Node package managers)
- **Prisma CLI** (for database migration)

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/moideenshacp/mobulous_todo.git
cd todo-app
```

### 2. Install Dependencies

Install the required packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of your project and set up the necessary environment variables:

```env
DATABASE_URL="your_database_connection_string"
JWT_SECRET="secret"
PORT=port
```

### 4. Database Setup

#### Run Migrations

To set up your database, run the Prisma migrations:

```bash
npx prisma migrate dev
```

This will create the necessary database tables and apply any migrations.

#### Generate Prisma Client

Generate the Prisma client:

```bash
npx prisma generate
```

## API Routes

The app utilizes **TRPC** for type-safe API routes. The main API routes for handling Todo operations are defined in the `todoRouter.ts` file. This file contains:

- **CRUD Operations**: Methods for creating, reading, updating, and deleting Todos.
- **Validation**: Input validation using **Zod** schemas to ensure data integrity.


## Frontend Components

The frontend is built using **Next.js** with **TypeScript**. Below are the key components:

- **TodoForm**: A form component to create new Todos.
- **TodoItem**: Displays individual Todo items with the option to mark as completed or delete.
- **TodoList**: A container for listing all Todos.
- **FilterButton**: A button to filter Todos based on their completion status.


```

## Running the Project

Once everything is set up, you can start the project by running:

```bash
npm run dev
```

This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
