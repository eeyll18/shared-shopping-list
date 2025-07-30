# CRUD API for Shopping List

A full-stack CRUD application for a shared shopping list, built with Next.js, Prisma, and PostgreSQL. 

## Features

- ✅ **Create:** Add new items to the shopping list with an optional quantity.
- ✅ **Read:** View all items, neatly separated into "To Buy" and "Purchased" sections.
- ✅ **Update:** Mark items as purchased, which moves them to the "Purchased" list and strikes them through. You can also un-mark them.
- ✅ **Delete:** Remove items from the list permanently.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Styling:** Tailwind CSS

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/download/) or a running instance via Docker/Cloud service.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/eeyll18/shared-shopping-list.git
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root of the project and add your PostgreSQL database connection URL. You can copy the example file:
    ```bash
    cp .env.example .env
    ```
    Now, open `.env` and modify the `DATABASE_URL`:
    ```env
    # .env
    DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
    ```

4.  **Run the database migration**
    This command will create the `ShoppingItem` table in your database based on the `schema.prisma` file.
    ```bash
    npx prisma migrate dev
    ```
    When prompted, give your migration a name (e.g., `init`).

5.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

The application exposes the following REST API endpoints:

| Method | Endpoint         | Description                   |
| :----- | :--------------- | :---------------------------- |
| `GET`  | `/api/items`     | Fetches all shopping items.   |
| `POST` | `/api/items`     | Creates a new shopping item.  |
| `PUT`  | `/api/items/[id]`| Updates a specific item.      |
| `DELETE`| `/api/items/[id]`| Deletes a specific item.      |


## Future Improvements

-   **User Authentication:** Add user accounts (e.g., with NextAuth.js) so different groups can have their own private lists.
-   **Categorization:** Allow users to categorize items (e.g., "Dairy", "Produce", "Cleaning Supplies").
