import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    subscription: {
        type: String,
        enum: ['free', 'premium'],
        default: 'free'
    },
    searchHistory: {
        type: Array,
        default: []
    },
    recentlyWatched: {
        type: Array,
        default: []
    }
})

export default mongoose.model('User', userSchema);

