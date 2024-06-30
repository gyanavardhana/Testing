//routes for organization

var express = require('express');
var router = express.Router();


const {signup, login, getOrganizationProfile, updateOrganizationProfile, 
getProjectIdeas, postProjectIdea, editProjectIdea, deleteProjectIdea, getOrganizaitonEmail, getOrganizationInfo} = require('../Controllers/OrganizationController');
const { get } = require('mongoose');
const { getMemberEmail } = require('../Controllers/MemberController');

router.post('/org/signup', signup);
router.post('/org/login', login);
router.post('/org/logout', login);
router.get('/org/profile', getOrganizationProfile);
router.put('/org/editprofile', updateOrganizationProfile);
router.get('/org/getprojectideas', getProjectIdeas);
router.post('/org/postprojectidea', postProjectIdea);
router.patch('/org/editprojectidea/:id', editProjectIdea);
router.delete('/org/deleteprojectidea/:id', deleteProjectIdea);
router.get('/org/getemail/:id', getOrganizaitonEmail);
router.get('/org/getorganizationinfo/:id', getOrganizationInfo);



module.exports = router;