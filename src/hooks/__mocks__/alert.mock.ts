import type { AlertMessage } from "@src/hooks/use-alert";
import { faker } from "@faker-js/faker";

export function createOpenWeatherAlertMessageMockData(): AlertMessage {
    return {
        active: faker.datatype.boolean(),
        duration: faker.number.int(),
        id: faker.lorem.lines(),
        message: faker.lorem.lines(),
        type: faker.helpers.arrayElement(["success", "info", "warning", "error"]),
        unclosable: faker.datatype.boolean(),
    };
}
