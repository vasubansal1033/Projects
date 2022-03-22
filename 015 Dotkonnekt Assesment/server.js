// const API_KEY = require('./secrets.js')
import API_KEY from './secrets.js'
import express from 'express';
import axios from 'axios';
import currentMapper from './currentMapper.js'
import forecastMapper from './forecastMapper.js';
import csvwriter from 'csv-writer'
// import cheerio from 'cheerio'
import { fileURLToPath } from 'url';
import { dirname, normalize } from 'path';

// const emitter = new EventEmitter()
// emitter.setMaxListeners(15)

let createCsvWriter = csvwriter.createObjectCsvWriter
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const $ = cheerio.load('./index.html')

let currentHeader = [];
let forecastHeader = [];
for (let key in currentMapper) {
    // console.log(key, currentMapper[key]);
    currentHeader.push({
        id: key,
        title: currentMapper[key]
    })
}
for (let key in forecastMapper) {
    forecastHeader.push({
        id: key,
        title: forecastMapper[key]
    })
}
// console.log(forecastHeader);


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
})
app.post('/', (req, res) => {
    // console.log(req.body.town);
    // getCurrentData(req.body.town);

    // console.log(req.body);

    let url;
    let town = req.body.town;
    if (req.body.choice == "current") {
        getCurrentData(town);
        url = `http://api.weatherapi.com/v1/current.json?`
    } else if (req.body.choice == "forecast") {
        getForecastData(town);
        url = `http://api.weatherapi.com/v1/forecast.json?`;
    }

    const requestData = {
        url: url,
        API_KEY: API_KEY,
        town: town,
        aqi: "no",
        alerts: "no"
    }
    const csvWriter = createCsvWriter({
        path: `Data/request_${town}.csv`,
        header: [
            { id: "url", title: "URL" },
            { id: "API_KEY", title: "API_KEY" },
            { id: "town", title: "Town" },
            { id: "aqi", title: "AQI" },
            { id: "alerts", title: "Alerts" }
        ]
    });

    csvWriter
        .writeRecords([requestData])
        .then(() => console.log('Data uploaded into csv successfully'));

    res.redirect('/');
})


// refactor following two functions
async function getCurrentData(town) {
    try {
        let url = `http://api.weatherapi.com/v1/current.json?`;
        let urlF = `${url}key=${API_KEY}&q=${town}&aqi=no`;
        let data = await axios.get(urlF);

        // console.log(data["data"]["location"]);

        const csvWriter = createCsvWriter({
            path: `Data/current_results_${town}.csv`,
            header: currentHeader
        });

        csvWriter
            .writeRecords([data["data"]["location"]])
            .then(() => console.log('Data uploaded into csv successfully'));

    } catch (error) {
        console.log(error.message);
    }

}
async function getForecastData(town) {
    try {
        let url = `http://api.weatherapi.com/v1/forecast.json?`;
        let urlF = `${url}key=${API_KEY}&q=${town}&aqi=no&alerts=no`;
        let data = await axios.get(urlF);

        // console.log(data["data"]["forecast"]["forecastday"][0]["astro"]);

        const csvWriter = createCsvWriter({
            path: `Data/forecast_results_${town}.csv`,
            header: forecastHeader
        });

        csvWriter
            .writeRecords([data["data"]["forecast"]["forecastday"][0]["astro"]])
            .then(() => console.log('Data uploaded into csv successfully'));

    } catch (error) {
        console.log(error.message);
    }

}


app.listen(3000);
