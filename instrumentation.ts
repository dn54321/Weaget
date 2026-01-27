
import ora from "ora";

import { ConfigDirector } from "./src/features/config/services/config.director";
import { ConfigSingleton } from "./src/features/config/services/config.singleton";

export async function register() {
    if (process.env.NEXT_RUNTIME !== "nodejs") {
        return;
    }
    
    const msw = await import("msw/node");
    console.log("___");
    console.log("");
    console.log("Initialising bootstrap server script.");
    // console.log("Verifying API keys.");
    // console.log("");
    // const shouldMockAPIs = Boolean(process.env.MOCK_INVALID_APIS === "true");
    // let apiKeysValid = true;
    // const envApiKeyMapping: Record<string, { handlers: Array<HttpHandler>; name: string; }> = {
    //     GEONAMES_USERNAME: {
    //         handlers: mockGeonameApiHandler,
    //         name: "Geonames location"
    //     },
    //     GOOGLE_APIKEY: {
    //         handlers: mockGoogleApiHandler,
    //         name: "Google auto-complete"
    //     },
    //     IPINFO_APIKEY: {
    //         handlers: mockIpinfoApiHandler,
    //         name: "IP info lookup"
    //     },
    //     OPENWEATHER_API: {
    //         handlers: mockOpenWeatherMapApiHandler,
    //         name: "Openweather weather"
    //     },
    //     POLLUTION_APIKEY: {
    //         handlers: mockApicnApiHandler,
    //         name: "APICN pollution"
    //     }
    // };

    // const mockHandler: Array<HttpHandler> = [];

    // for (const [environmentKey, api] of Object.entries(envApiKeyMapping)) {
    //     if (process.env[environmentKey]) {
    //         console.log(`  ${chalk.green("[SUCCESS]")} ${api.name}.`);
    //     }
    //     else if (shouldMockAPIs) {
    //         console.log(`  ${chalk.yellow("[MOCKED]")} ${api.name}.`);
    //         mockHandler.push(...api.handlers);
    //         apiKeysValid = false;
    //     }
    //     else {
    //         console.log(`  ${chalk.red("[FAILED]")} ${api.name}.`);
    //         apiKeysValid = false;
    //     }
    // }

    // console.log("");

    // if (apiKeysValid) {
    //     console.log("Weaget is ready to go!");
    // }

    // else if (shouldMockAPIs) {
    //     console.log("Detected missing API environment variables. If this was not intentional, please fill them in to replicate production.");
    //     const server = msw.setupServer(...mockHandler);
    //     server.listen();

    //     server.events.on("response:mocked", async ({ request, requestId, response }) => {
    //         const data = await response.json();
    //         console.log(
    //             "%s %s received %s %s %s",
    //             request.method,
    //             request.url,
    //             response.status,
    //             response.statusText,
    //             JSON.stringify(data)
    //         );
    //     });
    // }

    // else if (!shouldMockAPIs) {
    //     console.error("Detected missing API environment variables. Please fill them in and rerun the script.");
    //     console.error(`Alternatively, set the environment variable ${chalk.bgYellowBright.whiteBright.bold(" MOCK_INVALID_APIS ")} to 'true' to mock the APIs.`);
    //     throw new Error("Missing API Keys");
    // }
    let spinner = ora("Initialising Environment Variables.").start();
    const configDirector = new ConfigDirector();
    const configSettings = configDirector
        .getConfig()
        .make();
    const configService = ConfigSingleton.getInstance();
    configService.setConfig(configSettings);
    spinner.succeed("Initialised Environment Variables.");
    spinner = ora("Initialising APIs.").start();
    
    configService.prettyPrintConfig();

    console.log("Initialising APIs.");
}
