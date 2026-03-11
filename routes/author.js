var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('author', { 
    name: 'Ivan',
    lastname: 'Rivalcoba',
    mail: 'jorge.rr@gamadero.tecnm.mx'
  });
});

module.exports = router;
