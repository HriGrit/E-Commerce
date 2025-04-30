import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    verifiedAt: {
        type: Date,
    },

    verificationCode: {
        type: String,
    },

    verficationCodeCreatedAt: {
        type: Date,
        default: Date.now()
    },

    cart: {
        type: [String],
    },

    perferances: {
        type: [String],
        default: 'none',
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },

    image: {
        type: String,
        default: '',
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;