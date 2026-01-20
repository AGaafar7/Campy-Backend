import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { PORT } from "./config/env.js";
import userRouter from './routes/user.routes.js';
import courseRouter from './routes/course.routes.js';
import authRouter from './routes/auth.routes.js';
import lessonRouter from './routes/lesson.routes.js';
import progressRouter from './routes/progress.routes.js';
import connectToDatabase from "./database/mongodb.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

// Security & Logging Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
}));
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/lessons', lessonRouter);
app.use('/api/v1/progress', progressRouter);

// Health Check Route
app.get("/", (req, res)=> {
  res.json({ 
    message: "Welcome to Campy API!", 
    version: "1.0.0",
    status: "running" 
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global Error Handler
app.use(errorHandler);

// Server Startup
app.listen(PORT, async () => {
  console.log(`Campy API is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;