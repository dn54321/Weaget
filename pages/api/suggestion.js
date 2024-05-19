

// API String Call
const AUTOCOMPLETE = (input,lat,lng,uuid,offset) => (
    "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    + `?input=${input}&types=(cities)&location=${lat},${lng}&radius=500`
    + `&key=${process.env.GOOGLE_APIKEY}`
    + `${uuid == undefined ? "" : `&sessiontoken=${uuid}`}`
    + `${offset == undefined ? "" : `&offset=${offset}`}`
)


// Generates a list of autocomplete queries given a string
export default async function handler(req, res) {
    const {input, lat, lng, uuid, offset} = req.query;
    if (input === "") return res.status(500).json({results:[]});
    return await fetch(AUTOCOMPLETE(input,lat,lng,uuid,offset))
    .then(data => {
        if (!data.ok) {
            throw new Error("Unable to find location suggestions: " + res.status);
        }

        return data.json();
    })
    .then(data => {
        const results = data.predictions.map(loc => ({
            main: loc.structured_formatting.main_text,
            secondary: loc.structured_formatting.secondary_text
        }))

        return res.status(200).json({results: results});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({results:[]});
    });
}