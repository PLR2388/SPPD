const CSV = require("csv-string");
const fs = require("fs");

const viewsCtrl = require("./views");
const api = require('./api');

exports.addPerso = (req, res, next) => {
    const name = req.body.card;
    const level = req.body.level;
    const data = name + ";" + level + "\n";

    fs.appendFileSync("team.csv", data);
    res.render('charactersViews/AddElementCharacter', {done: true});
};

exports.modifyPerso = function (req, res, next) {
    let oldCard = req.body.oldCard;
    let newCard = req.body.newCard;
    let newLevel = req.body.level;
    try {
        const currentTeam = fs.readFileSync('team.csv', 'utf8');
        const arr = CSV.parse(currentTeam);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == oldCard) {
                arr[i][0] = newCard;
                arr[i][1] = newLevel;
                break;
            }
        }
        const data = CSV.stringify(arr, ";");
        fs.writeFileSync("team.csv", data);
        res.render('charactersViews/ModifyElementCharacter', {done: true, array: arr});
    } catch (err) {
        console.error(err)
    }

};

exports.deletePerso = function (req, res, next) {
    const oldCard = req.body.oldCard;
    try {
        const currentTeam = fs.readFileSync('team.csv', 'utf8')
        const arr = CSV.parse(currentTeam);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == oldCard) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0) {
            fs.unlinkSync('team.csv');
            console.log('file deleted');
        } else {
            const data = CSV.stringify(arr, ";");
            fs.writeFileSync("team.csv", data);
        }
        res.render('charactersViews/DeleteElementCharacter', {done: true, array: arr});
    } catch (err) {
        console.error(err)
    }
};

exports.displayDetailTeam = function (req, res, next) {

    fs.readFile('team.csv', {"encoding": 'utf-8'}, ((err, data) => {
        if (err) {
            if (err.code == "ENOENT") {
                res.render('charactersViews/detailListCard', {array: []})
            }
        } else {
            const arr = CSV.parse(data.toString());
            if (arr[0][1] == undefined) {
                res.render('charactersViews/detailListCard', {array: []})
            }
            let array = [];

            for (var i = 0; i < arr.length; i++) {
                const name = arr[i][0];
                const level = arr[i][1];
                let health;
                let dammage;

                const data1 = fs.readFileSync("../LevelDetails/" + name + ".csv");

                const levelArray = CSV.parse(data1.toString());
                for (let j = 0; j < levelArray.length; j++) {
                    if (levelArray[j][0] == level) {
                        health = levelArray[j][1];
                        dammage = levelArray[j][2];
                        break;
                    }
                }
                const detailCard = fs.readFileSync("../DetailCard/" + name + ".csv", 'utf8');
                const detailCardArray = CSV.parse(detailCard);

                const mana = detailCardArray[1][1];
                const theme = detailCardArray[1][3];
                const typeCarte = detailCardArray[1][2];
                const typePerso = detailCardArray[1][4];
                const rarity = detailCardArray[1][5];
                const rangeAttack = detailCardArray[1][6];
                const castArea = detailCardArray[1][7];
                const speedMax = detailCardArray[1][8];
                const timeSpeedMax = detailCardArray[1][9];
                const timeBetweenAttack = detailCardArray[1][10];
                const power1 = detailCardArray[1][11];
                const power2 = detailCardArray[1][12];

                let tab = [name, level, health, dammage, mana, theme, typeCarte, typePerso, rarity, rangeAttack,
                    castArea, speedMax, timeSpeedMax, timeBetweenAttack, power1, power2];
                array.push(tab);
            }
            let CSVToString = CSV.stringify(array, ";");
            fs.writeFileSync("detailCard.csv", CSVToString);
            res.render('charactersViews/detailListCard', {array: array})

        }
    }));


};

exports.displayAdd = function (req, res, next) {
    try {
        const currentTeam = fs.readFileSync('team.csv', 'utf8')

        const arr = CSV.parse(currentTeam);
        const nameCardsList = viewsCtrl.prepareOption();
        res.render('charactersViews/AddElementCharacter', {done: false, array: arr, nameCardsList: nameCardsList});
    } catch (err) {
        if (err.code == 'ENOENT') {
            // File doesn't exist
            const nameCardsList = viewsCtrl.prepareOption();
            res.render('charactersViews/AddElementCharacter', {done: false, array: [], nameCardsList: nameCardsList});
        }
        console.error()
    }

};

exports.diplayModify = (req, res, next) => {
    let currentTeam = "";
    try {
        const data = fs.readFileSync('team.csv', 'utf8')
        currentTeam = data;
        const arr = CSV.parse(currentTeam);
        console.log(arr);
        res.render('charactersViews/ModifyElementCharacter', {done: false, array: arr});
    } catch (err) {
        if (err.code == "ENOENT") {
            res.render('charactersViews/ModifyElementCharacter', {done: false, array: []});
        }
    }

};

exports.displayDelete = function (req, res, next) {
    try {
        const data = fs.readFileSync('team.csv', 'utf8')

        const arr = CSV.parse(data);
        res.render('charactersViews/DeleteElementCharacter', {done: false, array: arr});
    } catch (err) {
        if (err.code == "ENOENT") {
            res.render('charactersViews/DeleteElementCharacter', {done: false, array: []});
        }
    }

};

exports.displayMain = function (req, res, next) {
    res.render('charactersViews/ModificationCharacterList');
};