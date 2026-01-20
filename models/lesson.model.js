import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    lessonId: {
        type: String,
        required: [true, 'Lesson ID is required'],
        unique: true,
        trim: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Course ID is required'],
    },
    title: {
        type: String,
        required: [true, 'Lesson Title is required'],
        trim: true,
        minLength: 3,
        maxLength: 100,
    },
    content: {
        type: String,
        required: [true, 'Lesson Content is required'],
    },
    duration: {
        type: Number,
        required: [true, 'Lesson Duration is required'], // duration in minutes
        min: 1,
    },
    videoUrl: {
        type: String,
        default: null,
    },
    order: {
        type: Number,
        required: [true, 'Lesson Order is required'],
    },
    isPublished: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;
