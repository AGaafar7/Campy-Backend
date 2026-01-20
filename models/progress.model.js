import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Course ID is required'],
    },
    completedLessons: [
        {
            lessonId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson',
            },
            completedAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    overallProgress: {
        type: Number,
        default: 0, // percentage 0-100
        min: 0,
        max: 100,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
        default: null,
    },

}, { timestamps: true });

// Create a unique compound index for userId and courseId
progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
