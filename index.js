const express = require('express')
const app = express()
const path = require('path');
const axios = require('axios')
const fs = require('fs');

const port = 3000

// let rawdata = fs.readFileSync('data/test.json');
// let student = JSON.parse(rawdata);
// console.log(student)

app.use(express.static('public'));

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/slide/:id',function(req,res) {
    let id = req.param("id");
    console.log(id)
    res.sendFile(path.join(__dirname+'/public/slide.html'));
});

app.get('/text/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/text.html'));
});


const getData = (id) => {
    fs.readdir("/data/", function(err, items) {
        console.log(items);
    
        for (var i=0; i<items.length; i++) {
            console.log(items[i]);
        }
    });
    try {
        return axios.get('https://api.are.na/v2/channels/' + id + '/contents');
    } catch (error) {
        console.error(error);
    }
}

app.get('/data/:id', function(req,res) {
    let id = req.param("id");
    getData(id)
    .then(response => {
        let data = JSON.stringify(response.data)
        fs.writeFileSync('data/' + id + '.json', data);
        res.send(data)
    })
    .catch(error => {
      console.log(error)
      res.send(error)
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))