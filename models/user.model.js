import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'User Name is required'], 
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
         type: String, 
        required: [true, 'User Email is required'], 
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 6,

    },
    kudos:{
         type: Number,
         required: [true, 'User Kudos is required'],
    },
    coursesEnrolled: [
        {
            courseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
                required: true,
            },
            enrolledAt: {
                type: Date,
                default: Date.now,
            },
            progress: {
                type: Number,
                default: 0, // percentage 0-100
            },
            completed: {
                type: Boolean,
                default: false,
            },
        }
    ],

}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;

