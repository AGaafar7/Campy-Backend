import jwt from 'jsonwebtoken';
import { sendError } from '../utils/responseHandler.js';
import { JWT_SECRET } from '../config/env.js';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return sendError(res, 401, 'No token provided. Please login.');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        sendError(res, 401, 'Invalid or expired token');
    }
};

export const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};
