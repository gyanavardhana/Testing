const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectIdeaSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    skillsRequired: [String],
    memberId: { type: Schema.Types.ObjectId, ref: 'Member' },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' }
});

const ProjectIdea = mongoose.model('ProjectIdea', ProjectIdeaSchema);

module.exports = ProjectIdea;
