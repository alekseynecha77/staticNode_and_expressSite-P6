const express = require('express');
const { projects } = require('./data/data.json');

const app = express();

app.use('/static' , express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render(`index`);
    res.locals(data.projects);
});
app.get('/about', (req, res) => {
    res.render(`about`);
});
app.get('/projects/:id', (req, res) => {
    const{ id } = req.params;
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});