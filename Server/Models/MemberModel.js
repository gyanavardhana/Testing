const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: String,
    skills: [String],
    githubUsername: String
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;