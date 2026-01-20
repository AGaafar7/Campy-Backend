import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: [true, 'Course ID is required'],
        unique: true,
        trim: true,
    },
    title: {
        type: String,
        required: [true, 'Course Title is required'],
        trim: true,
        minLength: 5,
        maxLength: 100,
    },
    description: {
        type: String,
        required: [true, 'Course Description is required'],
        trim: true,
        minLength: 10,
        maxLength: 500,
    },
    duration: {
        type: Number,
        required: [true, 'Course Duration is required'], // duration in hours
        min: 1,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Course Instructor is required'],
    },
    price: {
        type: Number,
        required: [true, 'Course Price is required'],
        min: 0,
    },
    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
        }
    ],
    category: {
        type: String,
        default: null,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
    thumbnail: {
        type: String,
        default: null,
    },
    enrollments: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);

export default Course;