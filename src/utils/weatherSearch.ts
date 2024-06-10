function getHoursSinceNow(date: Date) {
    const currentDate = new Date();
    const diff = Math.abs(date.getTime()-currentDate.getTime());
    return Math.floor(diff/(60*60*1000));
}

// Client Search Weather
// If Weather Cached && Doesn't require revalidation, return weather
// Otherwise fetch weather and store in cache if possible.
// Cached Data is only stored per SESSION && on the client side.

export default async function searchWeather(location: string) {
    let region: undefined | string = undefined;
    if (typeof(Storage) !== "undefined") {
        // Check if Item exist and doesn't need to revalidate
        if (sessionStorage.hasOwnProperty("w_"+location)) {
            const weatherLocation = sessionStorage.getItem("w_"+location);
            const {data, date} = JSON.parse(weatherLocation as string);
            const datetime = new Date(date);
            if (!getHoursSinceNow(datetime)) return {data, response:200};
        }
        
        // Get region code for location biasing
        if (localStorage.hasOwnProperty("country")) {
            region = localStorage.getItem("country") as string;
        }
    }

    return await fetch(`/api/weather/${location}${region?"?region="+region:""}`)
    .then(data => {
        if (data.status !== 200) throw data.status
        return data.json();
    })
    .then(data => {
        // Cache Results if possible
        if (typeof(Storage) !== "undefined") {
            const date = Math.floor((new Date().getTime()));
            sessionStorage.setItem("w_"+location, JSON.stringify({data, date}));
        }

        // Return results
        return {data, response:200};
    })
    .catch(err => {
        return {response: err}
    });
}

// Checks if a location exist in the client session storage
export function checkWeatherCache(location: string) {
    if (typeof(Storage) === "undefined") {
        return false;
    }
    if (sessionStorage.hasOwnProperty("w_"+location)) {
        return true;
    } 

    return false;
}