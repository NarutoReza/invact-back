const mongoose = require('mongoose');

const Movies = new mongoose.Schema({
    movieId: { type: String },
    watch_status: {
        type: Boolean,
        default: false
    },
    ratingId: { type: String }
})

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    movies: [ Movies ],
    userType: {
        type: String,
        default: 'user'
    }
}, {timestamps: true});

module.exports = mongoose.model('User', User);