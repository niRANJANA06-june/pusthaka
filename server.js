import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { connectDB, ensureAdmin } from './config/db.js';
import User from './models/User.js';
import Message from './models/Message.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import communityRoutes from './routes/communities.js';
import messageRoutes, { canAccessRoom } from './routes/messages.js';
import adminRoutes from './routes/admin.js';

const app = express();
const server = http.createServer(app);
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: clientUrl }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);

// ---- Real-time chat ----
const io = new Server(server, { cors: { origin: clientUrl } });

io.use(async (socket, next) => {
  try {
    const { id } = jwt.verify(socket.handshake.auth?.token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.active) return next(new Error('Unauthorized'));
    socket.user = user;
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
});

io.on('connection', (socket) => {
  socket.on('join', async (room) => {
    if (await canAccessRoom(socket.user, room)) socket.join(room);
  });

  socket.on('message', async ({ room, text }) => {
    text = typeof text === 'string' ? text.trim() : '';
    if (!text || !socket.rooms.has(room)) return;
    const msg = await Message.create({ room, sender: socket.user._id, senderName: socket.user.name, text: text.slice(0, 1000) });
    io.to(room).emit('message', msg);
  });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(ensureAdmin)
  .then(() => server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('Startup failed:', err.message);
    process.exit(1);
  });
