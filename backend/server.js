import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// Load environment variables from .env file
dotenv.config({ path: path.resolve("C:/3 Centennial College/5th Semester/Personal Project/mern-chat-app-master/mern-chat-app-master/backend/.env") });

// Debugging line to check if .env variables are loaded correctly
console.log("Loaded MongoDB URI from .env:", process.env.MONGO_DB_URI);
console.log("Loaded Test Variable:", process.env.TEST_VARIABLE);

// Hardcoding MongoDB URI temporarily for testing purposes
// process.env.MONGO_DB_URI = "mongodb://localhost:27017/mern_chat";

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
