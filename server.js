const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port =  process.env.port || 3000;
const apiKey = '664e75460d9906ac047fff1f153d530a';

app.use(express.static(__dirname, + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
})

app.post('/', function (req, res) {

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city} &units=metric&appid=${apiKey}`
    console.log(req.body.city);
    request(url, function (err, response, body) {
        if (err) {
            return res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                return res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees with ${weather.weather[0].main} in ${weather.name}!`;
                return res.render('index', { weather: weatherText, error: null });
                console.log("body:", body)
            }
        }
    });
});

app.listen(port, function () {
    console.log(`Weatherly app listening on port: http://localhost:${port}!`);
});


