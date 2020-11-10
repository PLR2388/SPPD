const express = require('express');
const router = express.Router();
const charactersCtrl = require('../controllers/chracters');

router.get('/', charactersCtrl.displayMain);

router.get('/ajouterlistPerso', charactersCtrl.displayAdd);
router.post('/ajouterlistPerso', charactersCtrl.addPerso);

router.get('/modifierlistPerso', charactersCtrl.diplayModify);
router.post('/modifierlistPerso', charactersCtrl.modifyPerso);

router.get('/supprimerlistPerso', charactersCtrl.displayDelete);
router.post('/supprimerlistPerso', charactersCtrl.deletePerso);

router.get('/detailTeam',charactersCtrl.displayDetailTeam);

module.exports = router;