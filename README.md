# Pusthaka

A MERN platform for book lovers: exchange books, write reviews, join literary communities and chat in real time.

**Stack:** React (Vite) + Tailwind CSS, Express, Node.js, MongoDB (Mongoose), Socket.io, JWT auth.

## What you get

**Users**
- Register, log in and log out
- Post a book for exchange or write a review (1 to 5 stars), optionally inside a community
- Mark your exchange posts as exchanged or available again, delete your own posts
- Create, join and leave communities
- Real-time chat: a General room plus a room for every community you joined

**Admin**
- Secure login and logout (same login page, `admin` role)
- Dashboard counts, user list with last login and post count
- Activity log (logins, logouts, posts, community actions)
- Remove any post, deactivate or reactivate users

## Requirements

- Node.js 18 or newer
- MongoDB, either installed locally or a free MongoDB Atlas cluster

## Run it

1. **Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env     # already included, edit if needed
   npm run dev
   ```
   You should see `MongoDB connected` and `Server running on http://localhost:5000`.

2. **Frontend** (in a second terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Open http://localhost:5173

## Admin login

On first start the server creates an admin from the values in `server/.env`:

- Email: `admin@pusthaka.com`
- Password: `Admin@12345`

Change these in `.env` (and set a long random `JWT_SECRET`) before using the app for real.

## Using MongoDB Atlas instead of local MongoDB

In `server/.env`, replace `MONGO_URI` with your Atlas connection string, for example
`mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/pusthaka`.
In Atlas, add your IP under Network Access.

## Project layout

```
server/   Express API, Mongoose models, Socket.io chat
  models/ User, Post, Community, Message, Activity
  routes/ auth, posts, communities, messages, admin
client/   React app (pages, components, auth context)
```

## Troubleshooting

- **`MongoDB` connection fails:** make sure `mongod` is running, or check your Atlas string and IP access.
- **Port in use:** change `PORT` in `server/.env` and the proxy target in `client/vite.config.js`.
- **Chat says "Reconnecting…":** the backend is not running or crashed; check its terminal.
