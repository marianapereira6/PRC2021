var express = require('express');
var router = express.Router();
var Cinema = require('../controllers/cinema')

/* GET home page. */
router.get('/cinema', function(req, res, next) {
  Edicao.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});

module.exports = router;

