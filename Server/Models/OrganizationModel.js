const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrganizationSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    sector: String,
    phoneNumber: String,
    description: String,
    githubUsername: String
});

// modify Organization profile using Organization Schema

const OrganizationProfileSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    description: String,
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    contact: String,
    industry: String,
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
});

const OrganizationModel=mongoose.model('Organization', OrganizationSchema);
const OrganizationProfile=mongoose.model('OrganizationProfile', OrganizationProfileSchema);

module.exports = { OrganizationModel, OrganizationProfile };