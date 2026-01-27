
import { Configs } from "./enums/configs.enums";

export type ConfigMapping = {
    [Configs.APIKEY_APICN]: string,
    [Configs.APIKEY_GEONAMES]: string,
    [Configs.APIKEY_GOOGLE]: string,
    [Configs.APIKEY_IPINFO]: string,
    [Configs.APIKEY_OPENWEATHER]: string,
    [Configs.FORCE_MOCK_APICN_API]: boolean,
    [Configs.FORCE_MOCK_GEONAMES_API]: boolean,
    [Configs.FORCE_MOCK_GOOGLE_API]: boolean,
    [Configs.FORCE_MOCK_IPINFO_API]: boolean,
    [Configs.FORCE_MOCK_OPENWEATHER_API]: boolean,
    [Configs.MOCK_INVALID_APIS]: boolean,
    [Configs.USE_MOCK_ENDPOINTS]: boolean,
};