
// Nearby Location Search
// Finds nearby Location client Side.

export default async function searchLocation(place,lat,lng,cache=true) {
    let region = false;
    if (typeof(Storage) !== "undefined") {
        // Check if Item exist and doesn't need to revalidate
        if (sessionStorage.hasOwnProperty(`l_${lat},${lng}`)) {
            const location = sessionStorage.getItem(`l_${lat},${lng}`);
            return JSON.parse(location as string);
        }
        else {
            return await fetch(`/api/nearbySearch?lat=${lat}&lng=${lng}`)
            .then(res=> res.json())
            .then (data => {
                data = data.results.filter(x => !x.name.includes(place));
                sessionStorage.setItem(`l_${lat},${lng}`,JSON.stringify(data));
                return data;
            });
        }
    }
    else {
        return [];
    }
}
