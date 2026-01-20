import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../middleware/auth.middleware.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

// Sign Up
export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError('User with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        kudos: 0,
    });

    // Generate token
    const token = generateToken(newUser._id);

    sendSuccess(res, 201, 'User registered successfully', {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token,
    });
});

// Sign In
export const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    // Compare passwords
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new AppError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken(user._id);

    sendSuccess(res, 200, 'User signed in successfully', {
        userId: user._id,
        name: user.name,
        email: user.email,
        token,
    });
});

// Sign Out (client-side token deletion, but we can invalidate on backend if using token blacklist)
export const signOut = asyncHandler(async (req, res) => {
    sendSuccess(res, 200, 'User signed out successfully');
});
