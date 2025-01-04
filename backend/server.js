const express = require('express');
const http = require('http'); // Required for Socket.IO integration
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
const server = http.createServer(app); // Wrap Express app with HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/realtime-docs', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Mongoose Schema and Model
const DocumentSchema = new mongoose.Schema({
  content: { type: String, required: true }
});
const Document = mongoose.model('Document', DocumentSchema);

// API Endpoints
app.get('/documents/:id', async (req, res) => {
  const { id } = req.params;
  let document = await Document.findById(id);
  if (!document) {
    document = await Document.create({ _id: id, content: '' });
  }
  res.json(document);
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a specific document room
  socket.on('join', (documentId) => {
    socket.join(documentId);
    console.log(`Socket ${socket.id} joined room: ${documentId}`);
  });

  // Handle document updates
  socket.on('send-changes', (data) => {
    const { documentId, changes } = data;
    socket.broadcast.to(documentId).emit('receive-changes', changes);
  });

  // Save document content to the database
  socket.on('save-document', async (data) => {
    const { documentId, content } = data;
    await Document.findByIdAndUpdate(documentId, { content });
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
