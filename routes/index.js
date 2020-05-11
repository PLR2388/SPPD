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
    console.log(arr);
    res.render('ModifyElementCharacter',{done: false, array:arr});
});


router.post('/modifierlistPerso', function(req, res, next) {
    let oldCard=req.body.oldCard;
    let newCard=req.body.newCard;
    let newLevel=req.body.level;
    currentTeam="";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);
    for(let i=0;i<arr.length;i++){
        if(arr[i][0]==oldCard){
            arr[i][0]=newCard;
            arr[i][1]=newLevel;
            break;
        }
    }
    let data=CSV.stringify(arr,";");
    fs.writeFile("team.csv", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
    res.render('ModifyElementCharacter',{done: true, array:arr});
});


router.get('/supprimerlistPerso', function(req, res, next) {
    currentTeam="";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);
    res.render('DeleteElementCharacter',{done:false,array:arr});
});

router.post('/supprimerlistPerso', function(req, res, next) {
    let oldCard=req.body.oldCard;

    currentTeam="";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);
    for(let i=0;i<arr.length;i++){
        if(arr[i][0]==oldCard){
            arr.splice(i,1);
            break;
        }
    }
    console.log(arr);
    let data=CSV.stringify(arr,";");
    fs.writeFile("team.csv", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
    res.render('DeleteElementCharacter',{done:true,array:arr});
});


router.get('/detailTeam',function (req,res,next) {
    currentTeam="";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);
    let array=[];
    for(var i=0;i<arr.length;i++){
        let name=arr[i][0];
        let level=arr[i][1];
        let health;
        let dammage;
        let mana;
        let theme;
        let typeCarte;
        let typePerso;
        let rarete;
        let rangeAttaque;
        let castArea;
        let vitesseMax;
        let timeVitesseMax;
        let timeBetweenAttaque;
        let power1;
        let power2;

        levelDetail="";
        try {
            const data = fs.readFileSync("../LevelDetails/"+name+".csv", 'utf8');
            levelDetail=data;
        } catch (err) {
            console.error(err)
        }
        const levelArray = CSV.parse(levelDetail);

        for(let j=0;j<levelArray.length;j++){
            if(levelArray[j][0]==level){
                health=levelArray[j][1];
                dammage=levelArray[j][2];
                break;
            }
        }

        detailcard="";
        try {
            const data = fs.readFileSync("../DetailCard/"+name+".csv", 'utf8');
            detailcard=data;
        } catch (err) {
            console.error(err)
        }
        const detailCardArray = CSV.parse(detailcard);

        mana=detailCardArray[1][1];
        theme=detailCardArray[1][3];
        typeCarte=detailCardArray[1][2];
        typePerso=detailCardArray[1][4];
        rarete=detailCardArray[1][5];
        rangeAttaque=detailCardArray[1][6];
        castArea=detailCardArray[1][7];
        vitesseMax=detailCardArray[1][8];
        timeVitesseMax=detailCardArray[1][9];
        timeBetweenAttaque=detailCardArray[1][10];
        power1=detailCardArray[1][11];
        power2=detailCardArray[1][12];

        let tab=[name,level,health,dammage,mana,theme,typeCarte,typePerso,rarete,rangeAttaque,castArea,vitesseMax,timeVitesseMax,timeBetweenAttaque,power1,power2];
        array.push(tab);
    }
    let CSVToString=CSV.stringify(array,";");
    fs.writeFile("detailCard.csv", CSVToString, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });

    res.render('detailListCard',{array:array})
});

router.get('/calculation', function(req, res, next) {
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




module.exports = router;
