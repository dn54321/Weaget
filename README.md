
[1]: https://en.wikipedia.org/wiki/JavaScript
[2]: https://nextjs.org/
[3]: https://mui.com/
[4]: https://developers.google.com/maps/documentation/geocoding/overview
[5]: https://developers.google.com/maps/documentation/javascript/places-autocomplete
[6]: https://ipinfo.io/
[7]: http://www.geonames.org/export/web-services.html
[8]: https://aqicn.org/api/
[9]: https://openweathermap.org/api/one-call-api

<img src="public/banner.png" href="http://weaget.vercel.app" alt="banner"/>

![example workflow](https://github.com/dn54321/weaget/actions/workflows/production.yml/badge.svg)
[![codecov](https://codecov.io/github/dn54321/Weaget/graph/badge.svg?token=HPNINBGDJE)](https://codecov.io/github/dn54321/Weaget)
![Known Vulnerabilities](https://snyk.io/test/github/dn54321/weaget/badge.svg)
## Demo

Demo Link: [weaget.vercel.app](http://weaget.vercel.app)

## About
This project is a website written primarily in [Javascript][1] using [Nextjs][2] (a react framework) and [Material UI][3] (a UI library). The website allows a user to find <b>minutely, hourly and daily</b> weather information at any location as well as <b>pollution</b> details.

## Current Features:
- A search engine with autocomplete.
- Responsive Design.
- Temperature & Measurement conversion options.
- Weather & nearby places at your current location.
- Rainfall Graph w/ heuristic to show the most meaningful graph.
- Skeleton framework while weather data is being fetched.
- Custom weather icons.
- Advanced server/client side caching.
- The website is mostly web accessible.

## The API services used in this website:
In order to reduce costs, this website uses free services from various providers. The following are the APIs used in this project:

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
5. Install pnpm from the command line 
```bash
npm install -g pnpm
```
6. Install all pnpm dependencies 
```bash
pnpm install
```

7. Run the website
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Useful Commands
| Command | Description |
| --- | --- |
| `pnpm test` | Runs all test cases and reveals coverage. |
| `pnpm lint` | Reports and fixes the linting errors.|
| `pnpm storybook` | Provides a visual library of most of the components. |

## Upcoming Features

- Login systems for customisation such as local weather location.
- Pollution based on daily weather (currently waiting for pollution API)

## Design Considerations
- Smart caching mechanism on both server and client. 
    - Improves the user experience with faster load times.
    - Reduces the odds of hitting the rate limit of API credentials without the need to rate limit.
 
<br> 

- All API services are called server side.
    - Protects API keys from being stolen but slows down site significantly.
    - Allows for the implementation of rate limiting to prevent API abuse.

## Known Issues
- **Problem**: Setting to dark mode flickers on render during first time load.
    - Currently Material UI's solution for this is still experimental and will be fixed in a future release.
    - Ref: https://mui.com/material-ui/experimental-api/css-theme-variables/overview/

- **Problem**: Currently, we only support 'use client' for everything.
    - Our styling css-in-js (emotion) library doesn't currently support server side rendering, but this will be changed in v6 of mui.
    - Ref: https://nextjs.org/docs/app/building-your-application/styling/css-in-js
