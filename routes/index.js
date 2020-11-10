const express = require('express');
const router = express.Router();

const CSV=require("csv-string");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'SPPD' });
});

module.exports = router;
