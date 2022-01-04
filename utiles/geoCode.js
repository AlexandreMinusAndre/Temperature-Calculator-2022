require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.API_COORDINATES_KEY;


const geoCode = async (query) => {

  try {
    const {
      data: { data },
    } = await axios(
      `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${encodeURIComponent(query)}`
      
    );

    if (data.length == 0) {
      console.log("No results");
    } else {
      longitude = data[0].longitude;
      latitude = data[0].latitude;
      return {longitude, latitude};
    }

  } catch (err) {
    console.log("Error : " + err.message);
  }
};
module.exports = geoCode;
