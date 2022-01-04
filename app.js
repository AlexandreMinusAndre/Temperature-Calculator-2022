const geoCode = require("./utiles/geoCode");
const forecast = require("./utiles/forecast");
const express = require('express');
const bodyParser = require('body-parser');
const res = require("express/lib/response");

const axios = require("axios");


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: true
  }))

app.use(express.static('public'));

app.use(express.json());

const port = 3001;
app.listen(port, ()=> {console.log(`Server listenning on port ${port}`)});

app.get("/", (req, res)=> {
	res.render("index");

})

app.post("/temperature", async (req, res)=> {

	const ville = req.body.city

	try {
		console.log(ville);
		
		const geoloc = await geoCode(ville);
		const temp = await forecast(geoloc);
		console.log(`La température à ${ville} est de ${temp}°C.`);

		const result = {
			ville,
			temp
		}

	res.render("temperature", result);

	} catch (err) {
		console.log(err.message);
	}

})

app.get("/about", async (req, res)=> {
	res.render("about");
})

app.post("/suggestion", async (req, res) => {
	const API_KEY = process.env.API_SUGGESTION;

	if(req.body.city != "") {
		const { data } = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.city}.json?access_token=${API_KEY}&limit=5`);

		const result = {
			"result" : data.features.map(place => {
				return place.place_name
			})

		}

		console.log(result)
		res.send(result)
	} 
})
