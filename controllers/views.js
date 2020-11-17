// Update views

const CSV=require("csv-string");
const fs = require("fs");
const api = require('./api');

exports.prepareOption= () => {
    let array = [];
    let data;
    try {
        data = fs.readFileSync('allcards.csv', 'utf8');
        const arr = CSV.parse(data);
        for(let i=1;i<arr.length;i++) {
            array.push(arr[i][1]);
        }
        return array;
    } catch (err) {
        if(err.code === 'ENOENT') {
            // File doesn't exist
            api.cardsToCSV();
        }
        console.error(err)
    }

};