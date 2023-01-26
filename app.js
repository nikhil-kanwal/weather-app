const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));

app.get('/',function(req,res){

  res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "97c16dbec396e16cc99c97532b390d18#";
  const metric = "metric";
  const url =  "https://api.openweathermap.org/data/2.5/weather?q="+ query  +"&units="+ metric +"&appid="+ apiKey;

  https.get(url,function(response){

    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription  = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.write("<h1>the temperature in "+ query + " is "+ temp + " degree celcius.</h1>");
      res.write("<img src =" + imageURL + ">")
      res.write("<p>the weather is currently "+ weatherDescription +"</p>");
      res.send();
      
    })


  })

})

  

app.listen(3000,function(){

  console.log("sever is running at port 3000.");

})