const express = require("express");
const https = require("https");
const bodyParser= require("body-parser")

const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey="your api key";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey + "&q="+ query +"&units="+ unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData= JSON.parse(data);
            const temp= weatherData.main.temp;
            const description= weatherData.weather[0].description;
            const icon= weatherData.weather[0].icon;
            const image= 'http://openweathermap.org/img/wn/'+icon+'@2x.png';
            res.write("<h1>The temperature in "+ query+  " is "+ temp + " degree celcius.</h1>");
            res.write("<p>Weather description- "+ description + "</p>");
            res.write("<img src="+image+">");
            res.send();
        });
    });
});

app.listen("3000", function(){
    console.log("Server is up and running on port 3000");
});

