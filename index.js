import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']); // Fixes MongoDB Atlas DNS error
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


// Route & Database Imports
import pageRoutes from './routes/pageroutes.js';
import authRoutes from './routes/authroutes.js';
import dashboardRoutes from './routes/dashboardroutes.js';
import userRoutes from './routes/userroutes.js';
import { notFound } from './controller/pagecontroller.js';
import errorHandler from './middleware/errorhandler.js';
import connectdb from './config/database.js';

const app = express();
app.use(cookieParser()); 
// Database & CORS Setup
connectdb();
app.use(cors({
    origin: 'http://localhost:3001', // Adjust this to your frontend's origin
    credentials: true, // Allow cookies to be sent
}));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.resolve('view'));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses EJS Form submissions

// Static Assets
app.use(express.static(path.resolve('public')));
app.use('/uploads', express.static('uploads')); 

// 🚨 MOVE AUTH ROUTES TO THE TOP: Prevents other routes from intercepting requests
app.use(authRoutes);
app.use(pageRoutes);
app.use(dashboardRoutes);
app.use(userRoutes);

// Error Fallbacks
app.use(notFound);
app.use(errorHandler);

app.listen(3001, () => console.log('Server running on port 3001'));
