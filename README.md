
[1]: https://en.wikipedia.org/wiki/JavaScript
[2]: https://nextjs.org/
[3]: https://mui.com/
[4]: https://developers.google.com/maps/documentation/geocoding/overview
[5]: https://developers.google.com/maps/documentation/javascript/places-autocomplete
[6]: https://ipinfo.io/
[7]: http://www.geonames.org/export/web-services.html
[8]: https://aqicn.org/api/
[9]: https://openweathermap.org/api/one-call-api

# Demo

There is currently no avaliable Demo.

# About
This project is a website written primarily in [Javascript][1] using [Nextjs][2] (a react framework) and [Material UI][3] (a UI library). The website allows a user to find <b>minutely, hourly and daily</b> weather information at any location as well as <b>pollution</b> details.

## The website is currently in a stable release and features:
- A search engine with autocomplete.
- Responsive Design.
- Temperature & Measurement conversion options.
- Optimisations that determine what conversion systems to use based on your location.
- Weather & nearby places at your current location.
- Rainfall Graph w/ heuristic to show the most meaningful graph.
- Skeleton framework while weather data is being fetched.
- Custom weather icons.
- The website is mostly web accessible.

## The API services used in this website:
- [Google's Geocoding API][4] - To find the latitude (lat) and longitude (lng) of a location.
- [Google's Places Autocomplete API][5] - To complete and suggest locations you type.
- [IPinfo API][6] - To get local location details of the user including city/country/lat/lng.
- [Geonames's findNearby API][7] - To find nearby city locations for a particular lat/lng.
- [AQICN's Pollution API][8] - To find the pollution level of a particular location.
- [OpenWeatherMap's One Call API][9] - To find the minutely/hourly/daily weather details.

# How to run this project on your machine
1. Ensure you run this project using VSCode editor
2. Register API keys for the [API services mention above](#the-api-services-used-in-this-website).
4. Store API keys in .env.local found in the root folder of this project.
5. Install yarn from the command line 
```bash
npm install --global yarn
```
6. Install all yarn dependencies 
```bash
yarn install
```
7. Build the website

```bash
yarn run build
```

8. Run the website
```bash
yarn run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Upcoming Features

- Unit Testing
- Hash Limiting
- Login systems for customisation such as local weather location.
- Dark mode
- Pollution based on daily weather (currently waiting for pollution API)

# Design Considerations
- All details are stored in Storage rather than in Cookies. 
    - Storing and retrieving cookies as JWT will consume a large amount of bandwidth. 
    - Storing cookies as sessions requires a database which is a large overhead for for such a simple project.

<br>

- Weather details are stored client side. 
    - Caching Server side and distributing to user's client is against the terms and conditions for AQICN API.
    - Storing on both client/server adds needless complexity.

<br> 

- All API services are called server side.
    - Protects API keys from being stolen but slows down site significantly.
    - Allows for the implementation of hash limiting to prevent service call abuse.