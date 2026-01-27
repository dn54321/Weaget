import { HttpDataSources } from "@src/apis/_v2/@core/types/enums/http-data-sources.enum";
import { Configs } from "@src/features/config/types/enums/configs.enums";

export interface HttpSecret {
    key: string;
    location: HttpDataSources;
    value: Configs;
}