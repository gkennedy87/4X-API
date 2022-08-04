require('dotenv').config()
const { default: axios } = require('axios');
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


app.post('/', jsonParser, async (req,res) => {
	console.log(req.body)
	 const {base} = req.body;
	const headers = {
		apikey: process.env.API_KEY
	}
	const url = `https://api.apilayer.com/exchangerates_data/latest?base=${base}`
	 try {
		const resp = await axios.get(url, {
			headers: headers
		})
		console.log(resp.data)
		res.json(resp.data)
	}
	catch (err) {
		console.log(err)
	}
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
