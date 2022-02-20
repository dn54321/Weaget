import {createContext, useState, useEffect} from 'react'

const fahrenheitCountries = ["US", "LR", "BZ", "BS", "FM", "AG", "KY", "BM", "MH", "KN", "TC", "VG", "PW", "MS"];
const imperialCountries = ["US", "MM", "LBR"];
const system = {
    temperature_scale: "celcius",
    measurement_system: "metric",
    lat: 0,
    lng: 0,
    city: false,
    country: false,
    toggler: () => {}
}

function containString(str, lst) {
    if (lst.some(v => str.includes(v))) return true;
    return false;
}

export const SettingContext = createContext(system);

export default function SettingProvider(props) {
    const [setting, setSetting] = useState({...system});
    function toggler(state) {   
        setSetting({
            ...setting,
            ...state,
        });
    }
    useEffect(() => {
        function setStorage() {
            setSetting(state => ({
                ...state,
                temperature_scale: localStorage.getItem("temperature_scale"),
                measurement_system: localStorage.getItem("measurement_system"),
                lat: localStorage.getItem("lat"),
                lng: localStorage.getItem("lon"),
                city: localStorage.getItem("city"),
                country: localStorage.getItem("country")
            }));
        }

        if (typeof(Storage) !== "undefined") {
            if (!localStorage.hasOwnProperty("country")) {
                fetch('/api/location')
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("city", data.city);
                    localStorage.setItem("country", data.country);
                    const tempScale = containString(data.country,fahrenheitCountries) ? "fahrenheit" : "celcius";
                    const measScale = containString(data.country,imperialCountries) ? "imperial" : "metric";
                    const [lat, lon] = data.loc.split(',');
                    localStorage.setItem("lat", lat);
                    localStorage.setItem("lon", lon);
                    setStorage();
                })
            }
            else setStorage();
        }
      }, []);

    useEffect(() => {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("temperature_scale", setting.temperature_scale);
            localStorage.setItem("measurement_system", setting.measurement_system);
        }
    }, [setting.temperature_scale, setting.measurement_system]);
    return (
        <SettingContext.Provider value={{...setting, toggler}}>
            {props.children}
        </SettingContext.Provider>
    )   
}