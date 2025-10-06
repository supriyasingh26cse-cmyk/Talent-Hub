const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    skillsRequired: [String],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Gig', GigSchema);
