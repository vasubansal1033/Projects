const express = require('express');
const { authUser } = require('../basicAuth');
const app = express();
const { projects } = require('../data');
const { canViewProject, scopedProjects, canDeleteProject } = require('../permissions/project');
const router = express.Router();

router.get('/', authUser, (req, res) => {
    res.json(scopedProjects(req.user, projects));
})

router.get('/:projectId', setProject, authUser, authGetProject, (req, res) => {
    res.json(req.project);
})

router.delete('/:projectId', setProject, authUser, authDeleteProject, (req, res) => {
    res.send("Deleted project");
})

function setProject(req, res, next) {
    const projectId = parseInt(req.params.projectId);
    req.project = projects.find(project => project.id === projectId);

    if (req.project === null) return res.status(404).send('Project Not found');
    next();

}

function authGetProject(req, res, next) {
    if (!canViewProject(req.user, req.project)) {
        return res.status(401).send("Not allowed");
    }
    next();
}

function authDeleteProject(req, res, next) {
    if (!canDeleteProject(req.user, req.project)) {
        return res.status(401).send("Not allowed");
    }
    next();
}

module.exports = router;

