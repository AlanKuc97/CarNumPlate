const express = require('express');
const path = require('path');
const app = express();


const posts = require('./server/routes/posts.js');


app.use(express.static(path.join(__dirname, 'dist/CarNumPlate')));
app.use('/posts', posts);

app.get('*', (req, res)=>{
	res.sendFile(path.join(__dirname,'dist/CarNumPlate/index.html'));
})

const port = process.env.PORT || 3000;

app.listen(port, (req,res)=>{
	console.log('RUNNING on port ' + port);
})
// const http = require('http')
// const fs = require('fs')
// const port = 3000

// const server = http.createServer(function(req, res){
// 	res.writeHead(200,{ 'Content-Type': 'text/html'})
// 	fs.readFile('CarNumPlate/src/index.html', function(error,data){
// 		if(error){
// 			res.writeHead(404)
// 			res.write('Error: File Not Found')
// 		}else{
// 			res.write(data)
// 		}
// 		res.end()
// 	})

// })

// server.listen(port, function(error){
// 	if(error){
// 		console.log('Something went wrong', error)
// 	}else{
// 		console.log('Server is listening on port ' + port)
// 	}
// })