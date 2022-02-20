import { useRouter } from 'next/router';

const LOCATION_GRABBER = (ipAddr) => `https://ipinfo.io/${ipAddr}?token=${process.env.IPINFO_APIKEY}`

// Gets the user's city/country/lat/lng based on IP address
async function getLocation(ip) {
    return await fetch(LOCATION_GRABBER(ip)).then(data => data.json())
    .then (data => {
        if (data.bogon) return fetch(LOCATION_GRABBER("")).then(data2=>data2.json())
        return data;
    })  
}

export default async function handler(req, res) {
    let ip =  (req.headers['x-forwarded-for'] || '').split(',').pop()
    || req.connection.remoteAddress 
    || req.socket.remoteAddress 
    || req.connection.socket.remoteAddress
    
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
    }

    const data = await getLocation(ip);
    if (data.bogon) return res.status(500).json(data)
    return res.status(200).json(data)
}   