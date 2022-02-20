const NEARBYSEARCH = (lat,lng) => 
`http://api.geonames.org/findNearbyJSON?lat=${lat}&lng=${lng}&username=${process.env.GEONAMES_USERNAME}&maxRows=9&radius=300&featureCode=PPLX`

// Gets closeby city/suburb locations given lat/lng
export default async function handler(req, res) {
    const {lat, lng} = req.query;
    return await fetch(NEARBYSEARCH(lat,lng))
    .then (data => {
        if (!data.ok) throw new Error(data);
        return data.json();
    })
    .then (data => {
        if (data.status) return res.status(500).json(data);
        else return res.status(200).json({results: data.geonames.map(x => ({
            name: x.name,
            state: (x.adminCodes1 && x.adminCodes1.ISO3166_2) ? x.adminCodes1.ISO3166_2 : "",
            country: x.countryName
        }))});
    })
    .catch (err => {
        console.log(err);
        return res.status(500).json(err);
    })
}

