const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');
/* GET generated error route - create and throw 500 server error */


router.get('/', (req, res) => {
    res.render('index', { projects });
});
router.get('/about', (req, res) => {
    res.render(`about`);
});

router.get('/project/:id', (req, res, next) => {
    const{ id } = req.params;
    if(id <= projects.length && id >= 0){
        res.render('project', { project: projects[id] });
    
    }else{
        next();
    }
});
router.get('/error', (req, res, next) => {

    // Log out custom error handler indication
    console.log('Custom error route called');
    const err = new Error();
    err.message = `Custom 500 error thrown`
    err.status = 500;
    throw err;
});  
module.exports = router;
