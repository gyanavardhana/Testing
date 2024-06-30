const Member = require('../Models/MemberModel');
const MemberProfile = require('../Models/MemberProfileModel');
const ProjectIdea = require('../Models/ProjectIdeasModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const memberSignup = async (req, res, next) => {
    try {
        if(req?.body?.password !== req?.body?.confirmPassword){
            return res.status(400).send('passwords do not match');
        };
        const member = new Member({
            name: req?.body?.name,
            email: req?.body?.email,
            password: await bcrypt.hash(req?.body?.password, 10),
            gender: req?.body?.gender,
            skills: req?.body?.skills,
            githubUsername: req?.body?.githubUsername
        })
        await member.save();
        const id = await getMemberId(req?.body?.email);
        const profile = new MemberProfile({
            name: req?.body?.name,
            email: req?.body?.email,
            skills: req?.body?.skills,
            memberId: id
        });
        console.log(profile);
        await profile.save();
        res.status(200).send('member registration successful');
    }
    catch(err){
        if (err.code === 11000) {
            res.status(400).send('email already exists');
        } else {
            console.log('random error');
            console.log(err);
        }
    }
}

const getMemberId = async(email) => {
    const member = await Member.findOne({email: email});
    return member?._id;
}

const getMemberEmail = async(req,res) => {
    const member = await Member.findOne({_id: req?.params?.id})
    res.status(200).send(member.email);
    
}
const createToken = async (id) => {
    const token = jwt.sign({ id }, process.env.TOKEN, { expiresIn: 1000 });
    return token;
};

const comparePassword = async (password, user) => {
    const auth = await bcrypt.compare(password, user?.password);
    return auth;
};

const memberLogin = async (req, res, next) => {
    const email = req?.body?.email;
    const password = req?.body?.password;
    expirydate = 1000 * 60 * 60 * 24 * 3
    try {
        const user = await Member.findOne({ email: email });
        if (user) {
            const auth = await comparePassword(password, user);
            if (auth) {
                const token = await createToken(user?._id);
                console.log(token);
                res.cookie('jwt',  token, { maxAge: expirydate });
                res.status(200).send('login successful');
            } else {
                res.status(400).send('invalid credentials');
            }
        } else {
            res.status(404).send('user not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }
};

const memberLogout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).send('logged out');
};

const memberProfile = async(req, res, next) => {
    try {
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, process.env.TOKEN);
        const user = await MemberProfile.findOne({ memberId: decoded?.id });
        res.status(200).send(user);
    }
    catch(err){
        console.log(err);
        res.status(500).send('internal server error');
    }
}

const editMemberProfile = async (req, res, next) => {
    try {
        const token = req?.cookies?.jwt;
        console.log(token);
        const decoded = jwt.verify(token, process.env.TOKEN);
        const user = await MemberProfile.findOne({ memberId: decoded?.id });
        user.contact = req?.body?.contact;
        user.interests = req?.body?.interests;
        user.twitter = req?.body?.twitter; // Update Twitter
        user.github = req?.body?.github; // Update GitHub
        user.linkedin = req?.body?.linkedin; // Update LinkedIn
        await user.save();
        res.status(200).send('profile updated');
    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }
};


const postProjectIdea = async(req, res, next) => {
    try {
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, process.env.TOKEN);
        const projectIdea = new ProjectIdea({
            title: req?.body?.title,
            description: req?.body?.description,
            skillsRequired: req?.body?.skillsRequired,
            memberId: decoded?.id,
            organizationId: req?.body?.organizationId
        });
        await projectIdea.save();
        res.status(200).send('project idea posted');
    }
    catch(err){
        console.log(err);
        res.status(500).send('internal server error');
    }
}

const getProjectIdeas = async(req, res, next) => {
    try{
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, process.env.TOKEN);
        const projectIdeas = await ProjectIdea.find({memberId: decoded?.id});
        console.log(projectIdeas)
        res.status(200).send(projectIdeas);
    }catch(err){
        console.log(err);
        res.status(500).send('internal server error');
    }
}

const editProjectIdea = async(req, res, next) => {
    try{
        const projectId = req?.params?.id;
        const projectIdea = await ProjectIdea.findOne({_id: projectId})  
        projectIdea.title = req?.body?.title;
        projectIdea.description = req?.body?.description;
        projectIdea.skillsRequired = req?.body?.skillsRequired;
        await projectIdea.save();
        res.status(200).send('project idea updated');
    }catch(err){
        console.log(err);
        res.status(500).send('internal server error');
    }
}

const deleteProjectIdea = async(req, res, next) => {
    try{
        const projectId = req?.params?.id;
        await ProjectIdea.deleteOne({_id: projectId});
        res.status(200).send('project idea deleted');
    }catch(err){
        console.log(err);
        res.status(500).send('internal server error');
    }
}

const getMemberInfo = async(req, res, next) => {
    try{
        const memberId = req?.params?.id;
        const member = await Member.findOne({_id: memberId});
        res.status(200).send(member);
    }catch(err){
        console.log(err);
        res.status(500).send('internal server error');
    }
}
/*
const checkAuthenticated = async (req, res, next) => {
    const token = req?.cookies?.jwt;
    if (!token) {
        return res.send('not authenticated');
    }
    try {
        const user1 = jwt.verify(token, process.env.TOKEN);
        req.user = user1;
        next();
    } catch (error) {
        res.send('not authenticated');
    }
};

const checkNotAuthenticated = async (req, res, next) => {
    const token = req?.cookies?.jwt;
    if (token) {
        try {
            const user1 = jwt.verify(token, process.env.TOKEN);
            req.user = user1;
            return res.send('already authenticated');
        } catch (error) {
            next();
        }
    } else {
        next();
    }
};

*/
module.exports = {
    memberSignup,
    memberLogin,
    memberLogout,
    memberProfile,
    editMemberProfile,
    postProjectIdea,
    getProjectIdeas,
    editProjectIdea,
    deleteProjectIdea,
    getMemberEmail,
    getMemberInfo
    /*
    checkAuthenticated,
    checkNotAuthenticated
    */
}