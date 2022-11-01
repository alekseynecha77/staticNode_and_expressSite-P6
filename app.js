const express = require('express');
const router = express.Router();
const { data } = require('../../data/data.json');


router.use('/static' , express.static('public'));
router.set('view engine', 'pug');


router.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});