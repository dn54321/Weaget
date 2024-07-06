# Architecture

The goal of the project is to build a robust and maintable system that has no up-time cost and maximises the following metrics:
- performant
- accessible
- user experience

To achieve this, the APIs used mustbe free, highly avaliable and consistent. To improve performance, caching mechanisms can be put in place for both client and server. A correctly configured caching period should also reduce the odds of hitting any API rate limits set, while improving user experience. To improve consistency after processing the APIs, the APIs need to be validated, then normalised so they can be consumed by components without a high coupling to the APIs.

A high level overview of the architecture can be seen here.

![Architecture](/public/architecture.png)

The server and client components are seperated and all 3rd party APIs are fetched within the server before being validated and parsed and sent to the client. This improves the security of the software, as API keys are not exposed in the client. With validation checks on the schema on both client and server for the API requests, this reduces the amount of attack vectors that maybe caused by a bad actor.

## Folder structure

To support the following architecture, the files have been organised like so:

- **components** - Contains react components, styling and component test cases.
- **features** - Contains schemas, types and mocks for API endpoints.
- **services** - Server side fetching of API endpoints.
- **hooks** - Client side fetching of API endpoints, store data, and custom hooks.
- **utils** - Helper functions to reduce boilerplate code.

## Styling

When possible, please use Google's styling guide when possible: 
https://google.github.io/styleguide/tsguide.html