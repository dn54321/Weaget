import { faker } from "@faker-js/faker";
import { AlertMessage } from "../use-alert";

export function createOpenWeatherAlertMessageMockData(): AlertMessage {
    return {
        message: faker.lorem.lines(),
        type: faker.helpers.arrayElement(["success", "info", "warning", "error"]),
        duration: faker.number.int(),
        unclosable: faker.datatype.boolean(),
        id: faker.lorem.lines(),
        active: faker.datatype.boolean(),
    }
}