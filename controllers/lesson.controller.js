import Lesson from '../models/lesson.model.js';
import Course from '../models/course.model.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

// Get all lessons
export const getAllLessons = asyncHandler(async (req, res) => {
    const lessons = await Lesson.find()
        .populate('courseId', 'title');
    
    sendSuccess(res, 200, 'Lessons retrieved successfully', lessons);
});

// Get lessons by course
export const getLessonsByCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ courseId })
        .sort({ order: 1 });

    sendSuccess(res, 200, 'Course lessons retrieved successfully', lessons);
});

// Get lesson by ID
export const getLessonById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const lesson = await Lesson.findById(id)
        .populate('courseId', 'title');

    if (!lesson) {
        throw new AppError('Lesson not found', 404);
    }

    sendSuccess(res, 200, 'Lesson retrieved successfully', lesson);
});

// Create lesson
export const createLesson = asyncHandler(async (req, res) => {
    const { lessonId, courseId, title, content, duration, videoUrl, order } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError('Course not found', 404);
    }

    // Check if lesson ID already exists
    const existingLesson = await Lesson.findOne({ lessonId });
    if (existingLesson) {
        throw new AppError('Lesson with this ID already exists', 400);
    }

    const newLesson = await Lesson.create({
        lessonId,
        courseId,
        title,
        content,
        duration,
        videoUrl: videoUrl || null,
        order,
    });

    // Add lesson to course
    course.lessons.push(newLesson._id);
    await course.save();

    sendSuccess(res, 201, 'Lesson created successfully', newLesson);
});

// Update lesson
export const updateLesson = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const updatedLesson = await Lesson.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).populate('courseId', 'title');

    if (!updatedLesson) {
        throw new AppError('Lesson not found', 404);
    }

    sendSuccess(res, 200, 'Lesson updated successfully', updatedLesson);
});

// Delete lesson
export const deleteLesson = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const lesson = await Lesson.findByIdAndDelete(id);

    if (!lesson) {
        throw new AppError('Lesson not found', 404);
    }

    // Remove lesson from course
    await Course.findByIdAndUpdate(
        lesson.courseId,
        { $pull: { lessons: id } }
    );

    sendSuccess(res, 200, 'Lesson deleted successfully');
});
