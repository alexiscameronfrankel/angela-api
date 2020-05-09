const express = require("express")
const https = require("https"); //already bundled with node
const bodyParser = require("body-parser")

const app = express(); //initializes new express app

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");
  
}); 

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "37e6206f1a7f3779041c9c29b234fd8b";
    const unit = "metric"
    const url= `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${query}&units=${unit}`

https.get(url, function(response){
    console.log(response.statusCode); //this response is different than the response from requesting home page
    response.on("data", function(data){ //on is a METHOD that basically says when you receive data do this
        const weatherData = JSON.parse(data) //turns it into a JSON object
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description 
        const icon = weatherData.weather[0].icon
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
        console.log(weatherDescription)
        res.write(`<h1>The forecast is ${weatherDescription} </h1>`)
        res.write(`<h2>and it is ${temp} degrees</h2>`)
        res.write(`<img src=${iconUrl}>`);
        res.send() //you can only have one res.send in a GET request so you can do res.write and then res.send 
    })
   
  })
})


app.listen(3000, function(){
    console.log("Server is running on port 3000")
})