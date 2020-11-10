const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('Calculation');
});

router.get('/betterhealth', function(req, res, next) {
    res.render('ListBetter',{title:"la santé"});
});

router.get('/betterdamage', function(req, res, next) {
    res.render('ListBetter',{title:"les dommages"});
});

router.get('/bettermana', function(req, res, next) {
    res.render('ListBetter',{title:"la mana"});
});

router.get('/bettercombi', function(req, res, next) {
    res.render();
});

module.exports=router;