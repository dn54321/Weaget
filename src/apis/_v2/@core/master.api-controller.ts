import { ApicnApiController } from "@src/apis/_v2/apicn/apicn.api-controller";
import { GeonameApiConnector } from "@src/apis/_v2/geonames/geoname.api-controller";

import { ApiController } from "./types/interfaces/api-controller.interface";

export class MasterApiController implements ApiController {
    private controllers;

    constructor(
        apicnController: ApicnApiController = new ApicnApiController(),
        geonameController: GeonameApiConnector = new GeonameApiConnector()
    ) {
        this.controllers = [
            ...apicnController.getControllers(),
            ...geonameController.getControllers()
        ];
    }

    getControllers() {
        return this.controllers;
    }
}