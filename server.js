import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import productRoutes from "./src/routes/productRoutes.js";
import socketService from "./src/services/socketService.js";
import { testConnection } from "./src/config/db.js"; // import db sau khi dotenv đã load trong db.js

const app = express();
const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });
const io = new Server(server, { 
  cors: { origin: process.env.FRONTEND_URL || "*" }
});

// Socket.io
socketService(io);

app.use(express.json());
app.use(express.static("public"));

// Gắn io vào req để controller có thể phát sự kiện
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/products", productRoutes);

// Test DB connection
testConnection();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
