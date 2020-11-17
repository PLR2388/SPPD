const express = require('express');
const router = express.Router();

const CSV = require("csv-string");
const indexCtrl = require('../controllers/index');


router.get('/', function (req, res, next) {
    res.render('index', {title: 'SPPD'});
});

router.post('/generateFiles/1',indexCtrl.generateAllCard);

router.post('/generateFiles/2',indexCtrl.generateOthersFiles);

module.exports = router;
