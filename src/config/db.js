import express from "express";
import http from "http";
import { Server } from "socket.io";
import productRoutes from "./src/routes/productRoutes.js";
import socketService from "./src/services/socketService.js";
import { testConnection } from "./src/config/db.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
  },
});

socketService(io);

app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/products", productRoutes);

// ✅ TÊN HÀM ĐÚNG
await testConnection();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
