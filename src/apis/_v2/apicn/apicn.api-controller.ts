
import { ApiController } from "@src/apis/_v2/@core/types/interfaces/api-controller.interface";

import { ApicnPollutionApiConnector } from "./pollution/get/apicn-pollution.get.api-connector";

export class ApicnApiController implements ApiController {
    private connector;
    constructor(
        pollutionApiConnector: ApicnPollutionApiConnector = new ApicnPollutionApiConnector()
    ) {
        this.connector = [pollutionApiConnector];
    }

    getControllers() {
        return this.connector;
    }

}