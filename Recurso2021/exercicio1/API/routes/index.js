var express = require('express');
var router = express.Router();
var Cinema = require('../controllers/cinema')

/* GET home page. */
router.get('/api/filmes', function(req, res, next) {
  Cinema.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});



router.get('/api/filmes', function(req, res, next) {
  Cinema.getFilmesAno(req.query.ano)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});
module.exports = router;

router.get('/api/filmes/:id', function(req, res, next) {
  Cinema.getFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});
module.exports = router;

router.get('/api/atores', function(req, res, next) {
  Cinema.getAtores()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});



router.get('/api/atores/:id', function(req, res, next) {
  Cinema.getAtor(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});


router.get('/api/generos', function(req, res, next) {
  Cinema.getGeneros()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});


router.get('/api/filme', function(req, res, next) {
  Cinema.getGenero(req.query.gen)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das edições: ${e}`))
});

module.exports = router;