const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');
const fileName = './numberPlates.json';
const file = require(fileName);

bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'dist/CarNumPlate')));
//app.use('/posts', posts);
app.use(bodyParser.json());


app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname,'dist/CarNumPlate/index.html'));
})


app.get('/numberPlates.json', (req, res)=>{
	res.sendFile(path.join(__dirname,'numberPlates.json'));
})

app.post('/', function(req,res,next){
	fs.writeFileSync(fileName, JSON.stringify(req.body));
})


app.listen(port, (req,res)=>{
	console.log('RUNNING on port ' + port);
})
