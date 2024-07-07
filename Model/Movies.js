const mongoose = require('mongoose');

const Movies = new mongoose.Schema({
    title: { type: String },
    description:{ 
        type: String,
        default: ''
    },
    release_year: {
        type: Date,
        default: Date.now()
    },
    genre: {
        type: Array,
        default: []
    },
    rating: { type: String },
    trailer: { type: String }
}, {timestamps: true});

module.exports = mongoose.model('Movies', Movies);