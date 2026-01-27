
import { ApiController } from "@src/apis/_v2/@core/types/interfaces/api-controller.interface";

export class GeonameApiConnector implements ApiController {
    private connector;
    constructor(
        geonameApiConnector: GeonameApiConnector = new GeonameApiConnector()
    ) {
        this.connector = [geonameApiConnector];
    }

    getControllers() {
        return this.connector;
    }

}