const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    githubLink: { type: String, required: true },
    techUsed: { type: [String], required: true }
});

module.exports = mongoose.model('Project', ProjectSchema);
