// var express = require('express');
import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('author', { 
    name: 'Ivan',
    lastname: 'Rivalcoba',
    mail: 'jorge.rr@gamadero.tecnm.mx'
  });
});

export default router;