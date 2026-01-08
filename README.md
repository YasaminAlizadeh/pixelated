# Pixelated

Pixelated is a browser-based pixel art studio built with a Vite-powered React interface and a small Express + PostgreSQL backend. The frontend sticks close to canvas-native drawing logic so every tool stays responsive, and the backend keeps projects tied to authenticated users so work can be saved, retrieved, and shared safely.

## What you get in this repo

- **Pixel drawing tools** covering pencil, eraser, flood-fill, lines, rectangles, circles, and eyedroppers.
- **Layer management** with opacity, visibility, and drag-and-drop ordering stored in structured JSON so the layout survives every save.
- **Persistence and auth** powered by JWT, bcrypt, and PostgreSQL so each user can own multiple projects.
- **Modern stack**: React + TypeScript + Vite on the surface, with Express, pg, and nodemon handling the API.

## Project layout

- `pixelated-frontend/`: The Vite/React TypeScript application that renders the canvas, palettes, and tool panels. Uses Tailwind, Framer Motion, and React Router.
- `pixelated-backend/`: Express.js server that exposes `/auth` and `/api/projects` routes, talks to Postgres via `pg`, and guards project data with JWT middleware.
- `LICENSE`, `commitlint.config.js`, and other configuration files live at the project root alongside this README.

## Getting started

### 1. Prerequisites

- Install [Node.js](https://nodejs.org/) 14 or newer.
- Install [Yarn](https://classic.yarnpkg.com/en/docs/install) 1.22.5+ (for the frontend).
- Have PostgreSQL running locally and reachable.

### 2. Prepare the database

Create a database and the tables that the backend expects:

```sql
CREATE DATABASE pixelated_db;

-- run this against pixelated_db
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  layers JSONB,
  palettes JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Adjust names, constraints, or column types if you want tighter validation before connecting the app.

### 3. Backend setup (`pixelated-backend`)

1. `cd pixelated-backend`
2. Run `npm install`
3. Create a `.env` file with the connection info and JWT secret:

   ```
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=pixelated_db
   JWT_SECRET=super-secret-key
   ```

4. Start the server:
   - `npm run dev` for development (nodemon reloads the server on change).
   - `npm start` for a single-run production-style launch.

The backend listens on `http://localhost:3000` and exposes `/auth` plus `/api/projects` routes.

### 4. Frontend setup (`pixelated-frontend`)

1. `cd pixelated-frontend`
2. Run `yarn install`
3. (Optional) Create a `.env` file with `VITE_API_URL` if the backend runs somewhere other than `http://localhost:3000`:

   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Run `yarn dev` to launch the Vite dev server (defaults to `http://localhost:5173`).
5. Use `yarn build` when you are ready to produce an optimized bundle and `yarn preview` to inspect it locally.

### 5. Interaction tips

- Authenticate through the UI; every protected project request uses the JWT token from `/auth/login`.
- Projects sent to `/api/projects` include `layers` and `palettes` as JSON blobs, so make sure your frontend state matches the backend schema if you extend the editor.
- If the frontend shows CORS issues, double-check that you run `pixelated-backend` before the frontend or update `VITE_API_URL`.

## Next steps

1. Run the backend and frontend together, then sign up/log in and draw something to verify save/load.
2. Add migrations or seed scripts if you want reproducible database state.
3. Tie in deployment (Vite build + host the Express API) once the local workflow is solid.
