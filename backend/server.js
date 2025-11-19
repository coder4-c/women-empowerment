import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';

// Route imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import resourceRoutes from './routes/resources.js';
import mentorshipRoutes from './routes/mentorships.js';
import reportRoutes from './routes/reports.js';
import analyticsRoutes from './routes/analytics.js';
import adviceRoutes from './routes/advice.js';
import testimonialRoutes from './routes/testimonials.js';
import partnerRoutes from './routes/partners.js';
import subscriberRoutes from './routes/subscribers.js';
import externalContentRoutes from './routes/externalContent.js';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(mongoSanitize());
app.use(generalLimiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Women Empowerment Portal API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/mentorships', mentorshipRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/advice', adviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/external', externalContentRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
