import express from "express";
import http from "http";
import { Server } from "socket.io";
import productRoutes from "./src/routes/productRoutes.js";
import socketService from "./src/services/socketService.js";
import { testConnections } from "./src/config/db.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
  },
});

// init socket
socketService(io);

// middleware
app.use(express.json());
app.use(express.static("public"));

// inject io vào req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// routes
app.use("/api/products", productRoutes);

// test DB
await testConnections();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
