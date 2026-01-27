import { ApiConnectorBase } from "./types/interfaces/api-connector.interface";

export class CoreApiConnector<M extends object=object,Q extends object=object> implements ApiConnectorBase<M,Q> {
    cacheTags = ["api"];
}