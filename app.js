const express = require('express')
const app = express()

const path = require('path');
const axios = require('axios')
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// Tells node.js to use static front end assets
app.use(express.static('public'));

// Root url returns index.html
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

// :id is a route parameter
app.get('/slide/:id',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/slide.html'));
});

// Get data for a channel in arena
const getData = (id) => {
    // https://api.are.na/v2/channels/how-do-you-use-the-internet-mindfully?per=100
    try {
        return axios.get('https://api.are.na/v2/channels/' + id + '/contents?per=200');
    } catch (error) {
        // console.error(error);
        return error
    }
}

const getChannelData = (id) => {
    try {
        return axios.get("https://api.are.na/v2/channels/" + id);
    } catch (error) {
        // console.error(error);
        return error
    }
}

// Load data saved for an arena channel
const getSavedData = (id) => {
    let rawData = fs.readFileSync('data/' + id + '.json');
    let jsonData = JSON.parse(rawData);
    // console.log(typeof jsonData)
    // console.log(jsonData)
    return jsonData
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

// Check last time a json file was updated
const checkLastUpdated = (id) => {
    let rawData = fs.readFileSync('last_updated.json');
    let jsonData = JSON.parse(rawData);
    // console.log(jsonData)
    // console.log(id)

    let fileDate = new Date(jsonData[id])
    let currentDate = new Date()
    // console.log(fileDate)
    // console.log(currentDate)
    let numDays = datediff(fileDate,currentDate);
    console.log("Num days: " + numDays)
    if (numDays > 5){
        return true;
    } else {
        return false;
    }
}

function handleGetData(id){
    //Get contents of a channel
    getData(id)
    .then(response => {
        let data = response.data
        // Get general data about a channel
        getChannelData(id)
        .then(response2 => {
            let channelData = response2.data
            // Combine them and save
            let combinedData = {
                "channelDetails": channelData,
                "channelContents": data
            }
            fs.writeFileSync('data/' + id + '.json', JSON.stringify(combinedData));
            return combinedData
        })
        .catch(error => {
            return error
        })
    .catch(error => {
        return error
    })
})
}

// First check if we've saved the data. If so, just load existing data
// If not saved, make an API call to get data.
app.get('/data/:id', function(req,res) {
    let id = req.param("id");
    // console.log(id)
    fs.readdir("data/", function(err, items) {
        if (items.includes(id + ".json")){
            // if (checkLastUpdated(id)) {
            //     res.send(handleGetData(id))
            // }
            res.send(getSavedData(id))
        } else {
            res.send(handleGetData(id))
        }
    });
});

function randomNum(min, max) {
    var n = [];
    while (n.length < 3){
        num = Math.floor(Math.random() * max) + min
        if (n.indexOf(num) == -1){
            n.push(num);
        }
    }
    return n;
}

// Get three random previously submitted urls for the homepage
app.get('/exampleSlides', function(req,res) {
    fs.readdir("data/", function(err, items) {
        // console.log(items)
        let selections = randomNum(0,items.length);
        // console.log(selections)
        let data = []
        for (let i in selections){
            console.log(i)
            let rawData = fs.readFileSync('data/' + items[selections[i]]);
            let jsonData = JSON.parse(rawData);
            data.push(jsonData)
        }
        res.send(data)
    });
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))