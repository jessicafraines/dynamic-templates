'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/checkers', function(req, res){
  res.render('checkers');
});

app.get('/add/:v/:w/:x/:y', function(req, res){
  req.params.v *= 1;
  req.params.w *= 1;
  req.params.x *= 1;
  req.params.y *= 1;

  req.params.fontsize = req.query.fontsize;
  req.params.color = req.query.color;
  req.params.borderwidth = req.query.borderwidth;

  res.render('sum', req.params);
});

app.get('/sumlist/:list', function(req, res){
  req.params.list = req.params.list.split(',');
  req.params.list = req.params.list.map(function(x){
    return x * 1;
  });
  var sum = 0;
  for(var i = 0; i < req.params.list.length; i++){
    sum += req.params.list[i];
  }
  req.params.sum = sum;
  req.params.odd = req.query.odd;
  req.params.even = req.query.even;

  res.render('sumlist', req.params);

});

app.get('/dice/:x', function(req, res){
 var rolls = [];
 var sum = 0;
 for(var i = 0; i < req.params.x; i++){
   var result = Math.floor(Math.random() * 6) + 1;
   sum += result; 
   rolls.push(result);
 }
  req.params.rolls = rolls;
  req.params.sum = sum;
  
  res.render('dice', req.params);
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);
});
