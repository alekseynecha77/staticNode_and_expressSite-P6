const express = require('express');
const bodyParser = require('body-parser');

const { projects } = require('./data/data.json');
const app = express();


app.use(bodyParser.urlencoded({extended: false}))

app.use('/static' , express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { projects });
});
app.get('/about', (req, res) => {
    res.render(`about`);
});

app.get('/project/:id', (req, res, next) => {
    const{ id } = req.params;
    if(id <= projects.length && id >= 0){
        res.render('project', { project: projects[id] });
    
    }else{
        next();
    }
});
app.use((req, res, next)=>{
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next)=>{
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});