/*

  Checks if the location is valid.
  If so, Get the coord address via Google.
  Get the hourly/weekly weather via openweatherapi
  Get the pollution via WAQI
  Concat everything

*/

const GET_COORDS = (loc, region) => `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${process.env.GOOGLE_APIKEY}${region ? "&region="+region : ""}`;
const GET_ONE_WEATHER = (lat, lng) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_API}`;
const GET_POLLUTION = (lat, lng) => `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${process.env.POLLUTION_APIKEY}`;

const getLocationArray = (loc) => {
  const match = {
    "locality":   true,
    "administrative_area_level_1": true,
    "country": true
  }
  return loc.filter((val) => 
    val.types.some(x => x in match)
  ).map(val => {
    return (val.types[0] === "country") ?
      val.long_name :
      val.short_name
  });
}


async function getCoordsByLocation(loc, region) {
  return await fetch(GET_COORDS(loc, region))
  .then(res => res.json())
  .then(data => {
    if (data.status !== "OK") {
      console.log("Failed to fetch coords by location.");
      return ({status: data.status});
    }
    return ({
      name: getLocationArray(data.results[0].address_components),
      ...data.results[0].geometry.location,
      status: data.status
    })
  })
  .catch(err => {
    return ({status: "Function (getCoordsByLocation) Error: Could Not Execute"})
  })
}

async function getWeatherByCoords(lat, lng) {
  const oneWeatherPromise = new Promise((resolve, reject) => {
    fetch(GET_ONE_WEATHER(lat, lng))
    .then(res => res.json())
    .then(data => {
      if (data.cod) reject(data);
      else resolve(data);
    })
    .catch((err) => {
      reject(err)
    })
  });
  const pollutionPromise = new Promise((resolve, reject) => {
    fetch(GET_POLLUTION(lat, lng))
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") resolve(data);
      else reject(data);
    })
    .catch((err) => {
      reject(err)
    })
  });

  return await Promise.all([
    oneWeatherPromise,
    pollutionPromise
  ])
  .then(values => {
    return {
      status: "OK",
      weather: values[0],
      pollution: values[1].data
    }
  })
  .catch(err => {
    return {status: "INTERNAL SERVER ERROR", ...err}
  })
}

export default async function handler(req, res) {
  const { location, region} = req.query;
  const data = await getCoordsByLocation(location, region);
  if (data.status === "ZERO_RESULTS") res.status(404).json(data)
  else if (data.status !== "OK") res.status(500).json(data)
  else {
    const weatherData = await getWeatherByCoords(data.lat, data.lng);
    if (weatherData.status === "OK") {
      res.status(200).json({
        ...weatherData,
        ...data
      })
    }
    else res.status(500).json(data)
  }
}