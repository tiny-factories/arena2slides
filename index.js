const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();

const port = 3000

// router.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });

// router.get('/text',function(req,res){
//   res.sendFile(path.join(__dirname+'/text.html'));
// });

app.use(express.static('public'));

router.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

router.get('/text',function(req,res){
    res.sendFile(path.join(__dirname+'/public/text.html'));
});

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))