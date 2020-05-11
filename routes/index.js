var express = require('express');
var router = express.Router();
var fs = require("fs");
var CSV=require("csv-string");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SPPD' });
});

router.get('/characters', function(req, res, next) {
    res.render('ModificationCharacterList');
});

router.get('/ajouterlistPerso', function(req, res, next) {
    currentTeam="";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);

    res.render('AddElementCharacter',{done:false,array:arr});
});

router.post('/ajouterlistPerso', function(req, res, next) {
    let emplacement="../allcards.csv";
    let name=req.body.card;
    let level=req.body.level;
    let data=name+";"+level+"\n";

    fs.appendFile("team.csv", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
    res.render('AddElementCharacter',{done:true});
});

router.get('/modifierlistPerso', function(req, res, next) {
    currentTeam="";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);



    res.render('ModifyElementCharacter',{done: false, array:arr});
});

router.get('/supprimerlistPerso', function(req, res, next) {
    res.render('ModificationCharacterList');
});



module.exports = router;
