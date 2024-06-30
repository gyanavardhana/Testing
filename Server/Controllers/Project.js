const jwt = require('jsonwebtoken');
const Project = require('../Models/Project');
const Organization = require('../Models/OrganizationModel');
const Member = require('../Models/MemberModel');
const ProjectIdea = require('../Models/ProjectIdeasModel');

const createProject = async (req, res) => {
    try {
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, process.env.TOKEN);
        const project = new Project({
            title: req?.body?.title,
            description: req?.body?.description,
            organizationId: decoded?.id,
            githubLink: req?.body?.githubLink,
            techUsed: req?.body?.techUsed
        });
        if (req?.body?.teamMembers) {
            project.teamMembers = req.body.teamMembers;
        }
        await project.save();
        res.status(200).json({ message: 'Project created successfully' });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: error.message });
    }
}

const getAllProjects = async (req, res) => {
    try {
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, process.env.TOKEN);
        const projects = await Project.find({ organizationId: decoded?.id });
        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editProject = async (req, res) => {
    try {
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, process.env.TOKEN);
        const project = await Project.findById(req?.params?.id);
        if (project?.organizationId?.toString() !== decoded?.id?.toString()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        project.title = req?.body?.title;
        project.description = req?.body?.description;
        if (req?.body?.teamMembers) {
            project.teamMembers = req.body.teamMembers;
        }
        project.githubLink = req?.body?.githubLink;
        project.techUsed = req?.body?.techUsed;
        await project.save();
        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req?.params?.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEveryProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).send(projects);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getUserType = async (req, res) => {
    try {
        const token = req?.cookies?.jwt;
        if (!token) {
            throw new Error('JWT token not found');
        }
        const decoded = jwt.verify(token, process.env.TOKEN);
        const type = await Member.findOne({ _id: decoded?.id });
        if (type) {
            res.status(200).send('member');
        } else {
            res.status(200).send('organization');
        }
    } catch (error) {
        console.error('Error fetching user type:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

const getEveryProjectIdea = async (req, res) => {
    try {
        const projectIdeas = await ProjectIdea.find();
        res.status(200).send(projectIdeas);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const protectedRoute = async (req, res) => {
    try {
        const token = req?.cookies?.jwt;
        if (!token) {
            res.status(401).send('Unauthorized');
        }
        const decoded = jwt.verify(token, process.env.TOKEN);
        res.status(200).send('Login successful');
    } catch (error) {
        console.error('Error fetching user type:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createProject, getAllProjects, editProject, deleteProject, getEveryProjects, getUserType, getEveryProjectIdea, protectedRoute };
