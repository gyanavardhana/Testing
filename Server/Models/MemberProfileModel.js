const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberProfile = new Schema({
    name: String,
    skills: [String],
    contact: String,
    email: { type: String, required: true, unique: true },
    interests: [String],
    twitter: String, // New field for Twitter
    github: String, // New field for GitHub
    linkedin: String, // New field for LinkedIn
    memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true }
});

module.exports = mongoose.model('MemberProfile', MemberProfile);