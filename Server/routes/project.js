const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/Project');

router.post('/createproject', projectController.createProject);
router.get('/allprojects', projectController.getAllProjects);
router.put('/editproject/:id', projectController.editProject);
router.delete('/deleteproject/:id', projectController.deleteProject);
router.get('/everyproject', projectController.getEveryProjects);
router.get('/everyprojectidea', projectController.getEveryProjectIdea);
router.get('/usertype', projectController.getUserType);

module.exports = router;
