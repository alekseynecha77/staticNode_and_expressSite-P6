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
    console.log('not found page try different ending');
    const err = new Error('Not found');
    err.status = 404;
    next(err);

});
app.use((req, res, next)=>{
    console.log('error');

    const err = new Error();
    err.message = `500 error thrown`;
    err.status = 500;
    next(err);

});
/* Global error handler */

app.use((err, req, res, next)=>{
    if (err) {
        console.log('Global error handler called', err)
    } 
    if(err.status(404) === 404){
    
    res.status(404).render('page-not-found', {err});
}else{
    err.message = err.message || `oops look like have error`
    res.status(err.status || 500).render('error', {err});
}
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});