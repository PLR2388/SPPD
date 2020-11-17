const api = require('./api')

exports.generateAllCard = (req,res) =>{
    api.cardsToCSV();
    res.status(202).render('step1');
};

exports.generateOthersFiles = (req,res) => {
    api.dealWithAllCard();
    res.status(202).render('index',{title: 'SPPD'});
}