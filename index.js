const express = require('express')
const app = express()
const path = require('path');
const axios = require('axios')

const port = 3000


app.use(express.static('public'));

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/text/',function(req,res){
    console.log(req.param("id"))
    res.sendFile(path.join(__dirname+'/public/text.html'));
});

//sk8-graphics
const getURLData = (id) => {
    try {
        return axios.get('https://api.are.na/v2/channels/' + id + '/contents');
    } catch (error) {
        console.error(error);
    }
}

app.get('/data/:id', function(req,res) {
    let id = req.param("id");
    getURLData(id)
    .then(response => {

        res.send(response.data)
    })
    .catch(error => {
      console.log(error)
      res.send(error)
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))