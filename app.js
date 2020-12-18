const express = require("express");
const https = require("https");

const app= express();

app.get("/", function(req,res){
    const url="http://api.openweathermap.org/data/2.5/weather?appid=<myAPIkey>&q=Faridabad&units=metric#";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
        })
    })
});

app.listen("3000", function(){
    console.log("Server is up and running on port 3000");
});

