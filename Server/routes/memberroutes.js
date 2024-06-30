const express = require('express');
const router = express.Router();
const memberController = require('../Controllers/MemberController');
const ContactUsController = require('../Controllers/ContactUsController');
const cookeParser = require('cookie-parser');


router.use(cookeParser());
router.use(express.json());
router.post('/mem/signup',
    memberController.memberSignup);
router.post('/mem/login',
    memberController.memberLogin);
router.post('/logout',
    memberController.memberLogout);
router.post('/contactus',
    ContactUsController.contactUs);
router.get('/mem/memberprofile',
    memberController.memberProfile);
router.patch('/mem/editprofile',
    memberController.editMemberProfile);
router.post('/mem/postprojectidea',
    memberController.postProjectIdea);
router.get('/mem/getprojectideas',
    memberController.getProjectIdeas);
router.patch('/mem/editprojectidea/:id',
    memberController.editProjectIdea);
router.delete('/mem/deleteprojectidea/:id',
    memberController.deleteProjectIdea);
router.get('/mem/getemail/:id',
    memberController.getMemberEmail);
router.get('/mem/getmemberinfo/:id',
    memberController.getMemberInfo);


module.exports = router;