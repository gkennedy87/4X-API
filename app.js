require('dotenv').config()
const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
const port = 3000;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


app.get('/', jsonParser, async (req,res) => {
	const headers = {
		apikey: process.env.API_KEY
	}
	const url = `https://api.apilayer.com/exchangerates_data/latest?base=USD`
	 try {
		const resp = await axios.get(url, {
			headers: headers
		})
		const data = Object.entries(resp.data.rates)
		const nameArr = [
			"United Arab Emirates Dirham","Afghanistan Afghani","Albania Lek","Armenian Dram","Netherlands Antillean Guilder",
			"Angolan Kwanza","Argentina Peso","Australia Dollar","Aruba Guilder","Azerbaijan Manat","Bosnia-Herzegovina Convertible Mark",
			"Barbados Dollar","Bangladeshi Taka","Bulgarian Lev","Bahraini Dinar","Burundian Franc",
			"Bermuda Dollar","Brunei Darussalam Dollar","Bolivia Bolíviano","Brazil Real","Bahamas Dollar","Bitcoin","Bhutanese Ngultrum",
			"Botswana Pula","Belarusian Ruble","Old Belarussian Ruble","Belize Dollar","Canadian Dollar","Congolese Franc","Swiss Franc","Chilean Unit of Account (UF)","Chilean Peso",
			"Chinese Yuan","Colombian Peso","Costa Rica Colon","Cuban Convertible Peso","Cuban Peso","Cape Verdean Escudo","Czech Koruna","Djiboutian Franc","Danish Krone",
			"Dominican Peso","Algerian Dinar","Egyptian Pound","Eritrean Nakfa","Ethiopian Birr","Euro","Fijian Dollar","Falkland Islands Pound",
			"British Pound","Georgian Lari","Guernsey Pound","Ghanaian Cedi","Gibraltar Pound","Gambian Dalasi","Guinean Franc","Guatemalan Quetzal","Guyanaese Dollar",
			"Hong Kong Dollar","Honduran Lempira","Croatian Kuna","Haitian Gourde","Hungarian Forint","Indonesian Rupiah","Israeli New Shekel","Manx Pound","Indian Rupee","Iraqi Dinar",
			"Iranian Rial","Icelandic Króna","Jersey Pound","Jamaican Dollar","Jordanian Dinar","Japanese Yen","Kenyan Shilling","Kyrgystani Som","Cambodian Riel","Comorian Franc",
			"North Korean Won","South Korean Won","Kuwaiti Dinar","Cayman Islands Dollar","Kazakhstani Tenge","Laotian Kip","Lebanese Pound","Sri Lankan Rupee","Liberian Dollar","Lesotho Loti",
			"Lithuanian Litas","Latvian Lats","Libyan Dinar","Moroccan Dirham","Moldovan Leu","Malagasy Ariary","Macedonian Denar","Myanmar Kyat","Mongolian Tughrik","Macanese Pataca","Mauritanian Ouguiya",
			"Mauritian Rupee","Maldivian Rufiyaa","Malawian Kwacha","Mexican Peso","Malaysian Ringgit","Mozambican Metical","Namibian Dollar","Nigerian Naira",
			"Nicaraguan Córdoba","Norwegian Krone","Nepalese Rupee","New Zealand Dollar","Omani Rial",
			"Panamanian Balboa","Peruvian Sol","Papua New Guinean Kina","Philippine Peso","Pakistani Rupee","Poland Złoty","Paraguayan Guarani","Qatari Rial","Romanian Leu","Serbian Dinar","Russian Ruble",
			"Rwandan Franc","Saudi Riyal","Solomon Islands Dollar","Seychellois Rupee","Sudanese Pound","Swedish Krona","Singapore Dollar","Saint Helenian Pound","Sierra Leonean Leone",
			"Somali Shilling","Surinamese Dollar","São Tomé and Príncipe Dobra","Salvadoran Colón","Syrian Pound","Swazi Lilangeni","Thai Baht","Tajikistani Somoni","Turkmenistani manat",
			"Tunisian Dinar","Tonga Pa'anga","Turkish Lira","Trinidad/Tobago Dollar","Taiwan Dollar","Tanzania Shilling","Ukraine Hryvnia","Uganda Shilling",
			"United States Dollar","Uruguay Peso","Uzbekistani So'm","Vietnamese đồng","Vanuatu Vatu","Samoan tālā","Central African CFA Franc","Silver (troy ounce)","Gold (troy ounce)","Eastern Caribbean Dollar",
			"XDR Basket**","West African CFA Franc","Central Pacific Franc","Yemeni Rial","South African Rand","Zambian Kwacha (old)","Zambian Kwacha","Zimbabwean Dollar"
		]
		let currencyArr = []
		data.map((item) => {
			const abbr = item[0]
			const r = item[1]
			currencyArr.push({symbol:abbr, rate:r})
		})

		currencyArr.forEach((arr1, index) => {
			const curr = nameArr[index];
			arr1.name = curr
		  });


		//break object apart into an array of objects
		res.status(200).json({
			status: 200,
			data: currencyArr})
	}
	catch (err) {
		console.log(err)
		res.status(400).json({
			status: 400,
			message: "Request error"
		})
	}
});

app.post('/', jsonParser, (req,res) => {
	const {base, target} = req.body;
	console.log(req.body)
	console.log(base,target)
	const headers = {
		apikey: process.env.API_KEY
	}
	const url = `https://api.apilayer.com/exchangerates_data/latest?base=${base}&symbols=${target},USD,EUR,GBP,JPY`
	axios.get(url, {headers: headers})
		.then((resp) => {
			res.status(200).json(resp.data)
		})
		.catch((err) => {
			console.log(err)
			res.status(400).json({
				status: 400,
				message: 'There was an error with your request'
			})
		})
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
