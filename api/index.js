import express, { response } from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import { cloudinaryConnect } from '../api/config/Cloudinary.js';
import { dbConnect } from './config/DbConnect.js';
import path from "path";
import { fileURLToPath } from "url";
import axios from 'axios';

// Load environment variables
dotenv.config();

// Cloudinary & Database Connection
dbConnect();
// cloudinaryConnect();  // Uncomment if needed

// Fix for ES Modules (__dirname equivalent)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const url = `https://mern-blog-0a8p.onrender.com`;
const interval  = 30000;
function reloadWebsite(){
    axios.get(url).then((response)=>{
        console.log("website reloaded");
    })
    .catch((error)=>{
        console.log(`Error  : ${error.message}`);
    })
}

// Middlewares
app.use(express.json());      
app.use(cookieParser());

// API Routes
app.use('/api/user/', userRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/post/', postRoutes);

// Serve frontend from Vite build
const clientPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message  = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start Server (Use PORT from Render)
const port  = process.env.PORT || 3000;
// console.log(port);

app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
