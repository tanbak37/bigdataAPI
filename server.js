const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
var request1 = require('postman-request');
const apiKey = 'd64ce8a57546a24a1452383f801df3e1';
var cassandra = require('cassandra-driver');
const Uuid = require('cassandra-driver').types.Uuid;

var assert = require('assert');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')



    const client = new cassandra.Client({ contactPoints: ['127.0.0.1'],
      // const client = new cassandra.Client({ contactPoints: ['206.189.90.219'],    
      // authProvider: new PlainTextAuthProvider('devops', 'KDSdevops$1234'),
     keyspace: 'kdstest' });



// app.get('/', function (req, res) {
//   res.render('index', {weather: null, error: null});
// })



app.use(express.json());

app.post('/addmenu', function(request, response){
  console.log(request.body);
   // response.send(
   //  { "RespCode": "200",
   //    "status": "SUCCESS" 
   //  });    
var jRespon = request.body
console.log(jRespon.menu)
console.log(jRespon.path)
const idRandom = Uuid.random();

if(jRespon.menu==null||jRespon.path==null||jRespon.menu==''||jRespon.path==''){
     response.send(
    { "RespCode": "400",
      "status": "Mandatory Input is Null" 
    });    
     return request
} else{
     response.send(
    { "RespCode": "200",
      "status": "SUCCESS" 
    });   
}


   var query = 'INSERT INTO dppmenu (id, menu, path) VALUES (:id, :menu, :path)';
   var params = { id: idRandom, menu: jRespon.menu, path: jRespon.path};
   client.execute(query, params, { prepare: true });




});

// Set the headers





// app.post('/', function (req, res) {
//   let city = req.body.city;
//   let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

//   request(url, function (err, response, body) {

//     // if (city == null) {
//     //   console.log("kota kosong")
//     // } else {
//     //   console.log("kota isi")
//     // }

//     // if(err){
//     //   res.render('index', {weather: null, error: 'Error, please try again'});
//     // } else {
//     //   let weather = JSON.parse(body)
//     //   if(weather.main == undefined){
//     //     res.render('index', {weather: null, error: 'Error, please try again'});
//     //   } else {
//     //     let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//     //     res.render('index', {weather: weatherText, error: null});
//     //   }
//     // }

//     console.log(city)
//   });


// })






app.listen(9991, function () {
  console.log('Example app listening on port 9991!')
})
