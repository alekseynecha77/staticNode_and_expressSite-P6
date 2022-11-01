const express = require('express');
const { projects } = require('./data/data.json');
const app = express();

app.use('/static' , express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { projects });
});
app.get('/about', (req, res) => {
    res.render(`about`);
});
app.get('/projects/:id', (req, res, next) => {
    const{ id } = req.params;
    if(id <= projects.length && id >= 0){
        res.render('project', { project: projects[id] });
    
    }else{
        next();
    }
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});