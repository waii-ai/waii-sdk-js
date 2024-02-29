import WaiiHttpClient from "../../../lib/src/WaiiHttpClient"
import { GeneratedQuery, QueryGenerationRequest } from "../../query/src/Query"

const GET_ENDPOINT: string = 'get-generated-query-history';

type GeneratedQueryHistoryEntry = {
    query?: GeneratedQuery,
    request?: QueryGenerationRequest
};

type GetGeneratedQueryHistoryRequest = {
    limit?: number,
    offset?: number
};

type GetGeneratedQueryHistoryResponse = {
    history?: GeneratedQueryHistoryEntry[]
};

class History {
    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    };

    public async list(params: GetGeneratedQueryHistoryRequest = {},
        signal?: AbortSignal): Promise<GetGeneratedQueryHistoryResponse> {
        return this.httpClient.commonFetch(
            GET_ENDPOINT,
            params,
            signal
        );
    };
};

export default History;
export {
    GeneratedQueryHistoryEntry,
    GetGeneratedQueryHistoryRequest,
    GetGeneratedQueryHistoryResponse,
    GeneratedQuery
};
