# Testing

## Test Dependencies

Currently we use the following packages to test:

- **Vitest** - Testing framework + Coverage
- **React-Testing-Library** - Testing framework for components.
- **Faker** - Mocks data for us.
- **MSW** - Mocks all external network calls.

## Challenges

There are many things we need to remember to mock when building tests.

- Zustand Stores.
- React Query APIs.

## Recipes

### 1. Testing a component

To test a component, please render the component using the `withRender` function. This function wraps around the react-testing-library `render` function, adding the required context providers so that components can be tested in isolation.

```Typescript
    it("should render children.", () => {
        const { getByText } = withRender(<Layout>testText</Layout>);
        expect(getByText("testText")).toBeInTheDocument();
    });
```

### 2. Mocking an API endpoint

By default, all API endpoints are mocked with valid data through MSW. The mocked data resembles the actual endpoints as close as possible. However, if an API endpoint needs to be mocked with custom data, the following steps can be followed below:

1. Add the following 'afterEach' block inside unit test.
```Typescript
    afterEach(() => {
        testQueryClient.clear();
        vi.resetAllMocks();
    });
```

2. Find the handle of the corresponding API you would like to mock. Handles can be found inside *src/features*.

3. Mock API endpoint based on handle.

| Function         | Example |
| ---------------- | ------------- |
| `withHandleError(handle, statusCode?: number)`  | `withHandleError(mockCurrentLocationHandle, 500);`   |
| `withResponse(handle)`     | `withResponse(mockAutoCompleteHandle, [{ main: "mockLocation", secondary: "mockState" }])` |

### 3. Testing a Zustand store

When testing the state of a zustand store within our component, the initial state can be set with the withRender function.

 ```Typescript
    it("Compact Weather Cards must contain the min temperature (celcius).", () => {
        const settings = { temperatureScale: TemperatureScale.CELSIUS };
        const { getByText } = withRender(weatherCard, { settings });
        const temp = Math.round(cardProps.minTemperature - 273.15);
        expect(getByText(`${temp}°`)).toBeInTheDocument();
    });
 ```

 If the state of the zustand store cannot be identified visually after making a series of actions, a probe can be set to view the internal state of a store.

```Typescript
    async () => {
        const user = userEvent.setup();
        const widgetProbe = vi.fn();
        const { getAllByTestId } = withRender(
            <DailyWeatherCardWidget weatherData={weatherData} />,
            { probes: { widget: widgetProbe } }
        );

        await user.hover(getAllByTestId("weather-card")[0]);
        expect(widgetProbe.mock.lastCall[0]).toMatchObject({ 
            focusedWeather: weatherData.daily?.[0] 
        });
    });
```
