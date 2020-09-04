const express = require('express');
const router = express.Router();
const axios = require('axios');


//GET POST

router.get('/', (req, res)=>{
	res.send('POST WORKS');
});

module.exports = router;