// -- Require -- //

var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');
var pug = require('pug');
const path = require('path');

var app = express();

// -- Require -- //


//PUG//

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.get('/', function (req, res) {
        res.render('index')
    });

//PUG//

// -- Kör servern -- //
app.listen(3000, listening);
function listening(){
    console.log("listening...")
}
console.log("server online");
// -- Kör Servern -- //


//Hämtar lista:
var unParsedJson = fs.readFileSync('dogs.json');
//parsar lista:
var lista = JSON.parse(unParsedJson)

//skapar utrymme för hemsida:
app.use(express.static('website'));


// -- HÄMTAR VÄRDET FRÅN URL : LOCALHOST:3000/add/key/value -- //

    app.get('/add/:key/:value?', updateList);

    function updateList(req, res){  
        
        var godis = req.params.key;
        var betyg = parseInt(req.params.value);
        var reply;

        if(!betyg){
            reply = '<h1 style="text-align:center">Score is needed</h1>';
        }
        else {
            //Lägger till godis och betyg i lista
            lista[godis] = betyg;
    
            var stringified = JSON.stringify(lista, null, 2);
    
            //skriver informationen till lista.json
            fs.writeFileSync('lista.json', stringified);
    
            //Skickar ett meddelande tillbaka
            reply = `<h1 style="text-align:center">Congrats, you have added ${godis} and ${betyg} to the list.</h1>`;
        }
        res.send(reply);
    }

// -- HÄMTAR VÄRDET FRÅN URL : LOCALHOST:3000/add/key/value -- //



// -- VISAR JSON LISTAN PÅ GODIS URL -- //

    app.get('/godis', sendMessageToGodis);

    function sendMessageToGodis(req, res){
        res.send(lista);
    }

// -- VISAR JSON LISTAN PÅ GODIS URL -- //


//  -- SÖK  --  //

    app.get('/search/:key', search);

    function search(req, res){
        var key = req.params.key;
        var reply;

        if (lista[key]) {
            reply = {
                status : "found",
                searched_key : key,
                score : lista[key]
            }
        } 

        else{
            reply = "not found";
        }    
        res.send(reply);
    }

//  -- SÖK  --  //

