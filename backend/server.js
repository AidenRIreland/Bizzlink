import path from "path";
import { fileURLToPath } from "url"; // Needed for ES module directory handling
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from './routes/product.routes.js';

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import cors from "cors";

// Get the directory of the current file
//!DO NOT PUSH HARD CODED PATHINGS AS THAT WILL CAUSE ISSUES ON OTHER PCS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file located in the backend directory
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Debugging line to check if .env variables are loaded correctly
console.log("Loaded MongoDB URI from .env:", process.env.MONGO_DB_URI);
console.log("Loaded Test Variable:", process.env.TEST_VARIABLE);

// Set the port after loading .env variables
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",// Allow requests from frontend
    credentials: true, // Allow cookies and authentication headers
}));
app.options('*', cors()); // Handle preflight requests for all routes

// Increase payload size limits
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); 

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use('/api/products', productRoutes);

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// * Log Incoming Requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
