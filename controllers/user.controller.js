import User from '../models/user.model.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
        .select('-password')
        .populate('coursesEnrolled.courseId', 'title description');
    
    sendSuccess(res, 200, 'Users retrieved successfully', users);
});

// Get user by ID
export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const user = await User.findById(id)
        .select('-password')
        .populate('coursesEnrolled.courseId', 'title description');
    
    if (!user) {
        throw new AppError('User not found', 404);
    }

    sendSuccess(res, 200, 'User retrieved successfully', user);
});

// Create user
export const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError('User with this email already exists', 400);
    }

    const newUser = await User.create({
        name,
        email,
        password,
        kudos: 0,
    });

    sendSuccess(res, 201, 'User created successfully', {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
    });
});

// Update user
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, kudos } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (kudos !== undefined) updateData.kudos = kudos;

    const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
        throw new AppError('User not found', 404);
    }

    sendSuccess(res, 200, 'User updated successfully', updatedUser);
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    sendSuccess(res, 200, 'User deleted successfully');
});

// Get user's enrolled courses
export const getUserCourses = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id)
        .select('coursesEnrolled')
        .populate('coursesEnrolled.courseId');

    if (!user) {
        throw new AppError('User not found', 404);
    }

    sendSuccess(res, 200, 'User courses retrieved successfully', user.coursesEnrolled);
});
