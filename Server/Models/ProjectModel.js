const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    githubLink: String,
    techUsed: [String]
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
``
