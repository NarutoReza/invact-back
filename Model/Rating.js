const mongoose = require('mongoose');

const Rating = new mongoose.mongoose.Schema({
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Rating', Rating);