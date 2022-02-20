
// Gets whole hours since time Now given unix hours
function getHoursSinceNow(dt0) {
    const dt1 = Math.floor(new Date()/1000)
    const diff = Math.abs(dt0-dt1);
    return Math.floor(diff/(3600));
}

// Client Search Weather
// If Weather Cached && Doesn't require revalidation, return weather
// Otherwise fetch weather and store in cache if possible.
// Cached Data is only stored per SESSION && on the client side.

export default async function searchWeather(location) {
    let region = false;
    if (typeof(Storage) !== "undefined") {
        // Check if Item exist and doesn't need to revalidate
        if (sessionStorage.hasOwnProperty("w_"+location)) {
            const {data, dt} = JSON.parse(sessionStorage.getItem("w_"+location));
            if (!getHoursSinceNow(dt)) return {data, response:200};
        }
        
        // Get region code for location biasing
        if (localStorage.hasOwnProperty("country"))
        region = localStorage.getItem("country");
    }
    return await fetch(`/api/weather/${location}${region?"?region="+region:""}`)
    .then(data => {
        if (data.status !== 200) throw data.status
        return data.json();
    })
    .then(data => {
        // Cache Results if possible
        if (typeof(Storage) !== "undefined") {
            const dt = Math.floor(new Date()/1000);
            sessionStorage.setItem("w_"+location, JSON.stringify({data, dt}));
        }

        // Return results
        return {data, response:200};
    })
    .catch(err => {
        return {response: err}
    });
}

// Checks if a location exist in the client session storage
export function checkWeatherCache(location) {
    if (typeof(Storage) === "undefined") return false;
        // Check if Item exist and doesn't need to revalidate
    if (sessionStorage.hasOwnProperty("w_"+location)) return true;
    return false;
}