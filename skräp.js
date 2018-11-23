var express = require('express');
var bodyParser = require('body-parser')

var pug = require('pug');
const path = require('path');

const app = express();

//skapar utrymme för hemsida:
app.use(express.static('website'));

// -- Kör Servern -- //

    app.listen(3000, listening);

    function listening(){
        console.log("listening...")
    }
    console.log("server online");

// -- Kör Servern -- //

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({extended: true}));

 app.get('/', function(request, response){
    return response.render('index')
 });
 
//  app.get('/', function(request, response){
//     return response.redirect('home');
//  });
 
 app.get('/home', function(request, response){
    return response.render('base');
 });
 
 app.get('/getform', function(request, response){
    return response.render('get_form')
 });
 
 app.get('/postform', function(request, response){
    return response.render('post_form');
 });
 
 app.get('/getsubmit', function(request, response){
    return response.send(request.query);
 });
 
 app.post('/postsubmit', function(request, response){
    return response.send(request.body);
 });
 
