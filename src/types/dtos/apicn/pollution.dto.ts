import { Expose } from "class-transformer";
import type { Pollution } from "../../models/apicn/pollution.model";
import ApicnPollutionModel from "../../models/apicn/pollution.model";

export default class ApicnPollutionModelDto implements ApicnPollutionModel {
    @Expose() status: string;
    @Expose() data: Pollution;
    @Expose() message?: string;
}