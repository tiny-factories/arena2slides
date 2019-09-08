const express = require('express')
const app = express()
const path = require('path');
const axios = require('axios')
const fs = require('fs');

const port = 3000

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
    try {
        console.log(typeof axios.get('https://api.are.na/v2/channels/' + id + '/contents'));
        return axios.get('https://api.are.na/v2/channels/' + id + '/contents');
    } catch (error) {
        console.error(error);
        return error
    }
}

// Load data saved for an arena channel
const getSavedData = (id) => {
    let rawData = fs.readFileSync('data/' + id + '.json');
    let jsonData = JSON.parse(rawData);
    console.log(typeof jsonData)
    return jsonData
}

// First check if we've saved the data. If so, just load existing data
// If not saved, make an API call to get data.
app.get('/data/:id', function(req,res) {
    let id = req.param("id");
    console.log(id)
    fs.readdir("data/", function(err, items) {
        if (items.includes(id + ".json")){
            res.send(getSavedData(id))
        } else {
            getData(id)
            .then(response => {
                let data = JSON.stringify(response.data)
                fs.writeFileSync('data/' + id + '.json', data);
                res.send(data)
            })
            .catch(error => {
                res.send(error)
            })
        }
    });
});

app.get('/exampleSlides', function(req,res) {
    fs.readdir("data/", function(err, items) {
        console.log(items)
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))