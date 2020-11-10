const CSV=require("csv-string");
const fs = require("fs");
const api = require('./api');

exports.addPerso = (req, res, next) =>{
    let emplacement="../allcards.csv";
    let name=req.body.card;
    let level=req.body.level;
    let data=name+";"+level+"\n";

    fs.appendFile("team.csv", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
    res.render('AddElementCharacter',{done:true});
};

exports.modifyPerso =function(req, res, next) {
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
};

exports.deletePerso = function(req, res, next) {
    let oldCard=req.body.oldCard;

    let currentTeam = "";
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
};

exports.displayDetailTeam = function (req,res,next) {
    currentTeam="";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);
    let array=[];
    let levelDetail;
    for (var i = 0; i < arr.length; i++) {
        let name = arr[i][0];
        let level = arr[i][1];
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

        levelDetail = "";
        try {
            const data = fs.readFileSync("../LevelDetails/" + name + ".csv", 'utf8');
            levelDetail = data;
        } catch (err) {
            console.error(err)
        }
        const levelArray = CSV.parse(levelDetail);

        for (let j = 0; j < levelArray.length; j++) {
            if (levelArray[j][0] == level) {
                health = levelArray[j][1];
                dammage = levelArray[j][2];
                break;
            }
        }

        detailcard = "";
        try {
            const data = fs.readFileSync("../DetailCard/" + name + ".csv", 'utf8');
            detailcard = data;
        } catch (err) {
            console.error(err)
        }
        const detailCardArray = CSV.parse(detailcard);

        mana = detailCardArray[1][1];
        theme = detailCardArray[1][3];
        typeCarte = detailCardArray[1][2];
        typePerso = detailCardArray[1][4];
        rarete = detailCardArray[1][5];
        rangeAttaque = detailCardArray[1][6];
        castArea = detailCardArray[1][7];
        vitesseMax = detailCardArray[1][8];
        timeVitesseMax = detailCardArray[1][9];
        timeBetweenAttaque = detailCardArray[1][10];
        power1 = detailCardArray[1][11];
        power2 = detailCardArray[1][12];

        let tab = [name, level, health, dammage, mana, theme, typeCarte, typePerso, rarete, rangeAttaque, castArea, vitesseMax, timeVitesseMax, timeBetweenAttaque, power1, power2];
        array.push(tab);
    }
    let CSVToString=CSV.stringify(array,";");
    fs.writeFile("detailCard.csv", CSVToString, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
    res.render('detailListCard',{array:array})
};

exports.displayAdd=function(req, res, next) {
    let currentTeam = "";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);

    res.render('AddElementCharacter',{done:false,array:arr});
};

exports.diplayModify=(req, res, next) =>{
    let currentTeam = "";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);
    console.log(arr);
    res.render('ModifyElementCharacter',{done: false, array:arr});
};

exports.displayDelete =function(req, res, next) {
    let currentTeam = "";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam=data;
    } catch (err) {
        console.error(err)
    }
    const arr = CSV.parse(currentTeam);
    res.render('DeleteElementCharacter',{done:false,array:arr});
};

exports.displayMain = function(req, res, next) {
    res.render('ModificationCharacterList');
};