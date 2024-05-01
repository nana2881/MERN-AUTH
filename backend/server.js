import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Set up port
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => res.send('Server is ready to serve'));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () =>
  console.log(`Server started on port ${port}`.brightYellow)
);
