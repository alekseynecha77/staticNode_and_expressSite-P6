const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended: false}))

app.use('/static' , express.static('public'));
app.set('view engine', 'pug');


app.use((req, res, next)=>{
    console.log('not found page try different ending');
    const err = new Error('Not found');
    err.status = 404;
    next(err);

});
/* Global error handler */

app.use((err, req, res, next)=>{
    if (err) {
        console.log('Global error handler called', err)
    } 
    if(err.status === 404){
    
    res.status(404).render('page-not-found', {err});
}else{
    err.message = err.message || `oops it looks like you got into wrong page`
    res.status(err.status || 500).render('error', {err});
}
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});

module.exports = app;
