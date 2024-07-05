# Architecture

The goal of the project is to build a robust and maintable system with trying to maximise the following goals while also keeping cost to free.
- performant
- accessible
- user experience

To achieve this, the APIs need to be free, highly avaliable and consistent. To improve performance, caching mechanisms can be put in place for both client and server. To improve consistency, after processing the APIS, the APIs need to be validated, then normalised.

A high level overview of the architecture can be seen here.
![Architecture](/public/architecture.png)

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