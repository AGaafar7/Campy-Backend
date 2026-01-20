import Course from '../models/course.model.js';
import User from '../models/user.model.js';
import Progress from '../models/progress.model.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

// Get all courses
export const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({ isActive: true })
        .populate('instructor', 'name email')
        .populate('lessons');
    
    sendSuccess(res, 200, 'Courses retrieved successfully', courses);
});

// Get course by ID
export const getCourseById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await Course.findById(id)
        .populate('instructor', 'name email')
        .populate('lessons');

    if (!course) {
        throw new AppError('Course not found', 404);
    }

    sendSuccess(res, 200, 'Course retrieved successfully', course);
});

// Create course
export const createCourse = asyncHandler(async (req, res) => {
    const { courseId, title, description, duration, instructor, price } = req.body;

    // Check if course ID already exists
    const existingCourse = await Course.findOne({ courseId });
    if (existingCourse) {
        throw new AppError('Course with this ID already exists', 400);
    }

    const newCourse = await Course.create({
        courseId,
        title,
        description,
        duration,
        instructor,
        price,
        lessons: [],
    });

    sendSuccess(res, 201, 'Course created successfully', newCourse);
});

// Update course
export const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).populate('instructor', 'name email')
     .populate('lessons');

    if (!updatedCourse) {
        throw new AppError('Course not found', 404);
    }

    sendSuccess(res, 200, 'Course updated successfully', updatedCourse);
});

// Delete course
export const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
        throw new AppError('Course not found', 404);
    }

    sendSuccess(res, 200, 'Course deleted successfully');
});

// Enroll user in course
export const enrollCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.body;

    if (!userId) {
        throw new AppError('User ID is required', 400);
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError('Course not found', 404);
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Check if already enrolled
    const alreadyEnrolled = user.coursesEnrolled.some(
        c => c.courseId.toString() === courseId
    );
    if (alreadyEnrolled) {
        throw new AppError('User is already enrolled in this course', 400);
    }

    // Add course to user's enrolled courses
    user.coursesEnrolled.push({
        courseId: courseId,
        enrolledAt: new Date(),
    });
    await user.save();

    // Increment course enrollment count
    course.enrollments += 1;
    await course.save();

    // Create progress record
    await Progress.create({
        userId,
        courseId,
        completedLessons: [],
        overallProgress: 0,
    });

    sendSuccess(res, 200, 'Successfully enrolled in course', {
        enrollment: user.coursesEnrolled[user.coursesEnrolled.length - 1],
    });
});

// Unenroll user from course
export const unenrollCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.body;

    if (!userId) {
        throw new AppError('User ID is required', 400);
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Check if enrolled
    const enrollmentIndex = user.coursesEnrolled.findIndex(
        c => c.courseId.toString() === courseId
    );
    if (enrollmentIndex === -1) {
        throw new AppError('User is not enrolled in this course', 400);
    }

    // Remove course from user's enrolled courses
    user.coursesEnrolled.splice(enrollmentIndex, 1);
    await user.save();

    // Decrement course enrollment count
    const course = await Course.findById(courseId);
    if (course && course.enrollments > 0) {
        course.enrollments -= 1;
        await course.save();
    }

    // Delete progress record
    await Progress.deleteOne({ userId, courseId });

    sendSuccess(res, 200, 'Successfully unenrolled from course');
});

// Get user's courses
export const getUserCourses = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId)
        .populate('coursesEnrolled.courseId');

    if (!user) {
        throw new AppError('User not found', 404);
    }

    sendSuccess(res, 200, 'User courses retrieved successfully', user.coursesEnrolled);
});

// Cancel course (set inactive)
export const cancelCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );

    if (!course) {
        throw new AppError('Course not found', 404);
    }

    sendSuccess(res, 200, 'Course cancelled successfully', course);
});
