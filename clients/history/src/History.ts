import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { GeneratedQuery, QueryGenerationRequest } from "../../query/src/Query";
import { ChartGenerationRequest, ChartGenerationResponse } from "../../chart/src/Chart";
import { ChatRequest, ChatResponse } from "../../chat/src/Chat";

const GET_ENDPOINT: string = 'get-generated-query-history';

type GeneratedQueryHistoryEntry = {
    query?: GeneratedQuery,
    request?: QueryGenerationRequest
};

type GeneratedChartHistoryEntry = {
    request?: ChartGenerationRequest,
    response?: ChartGenerationResponse
};

type GeneratedChatHistoryEntry = {
    request?: ChatRequest,
    response?: ChatResponse
};

type GetGeneratedQueryHistoryRequest = {
    includedTypes?: GeneratedHistoryEntryType[],
    limit?: number,
    offset?: number,
    timestampSortOrder?: SortOrder,
    uuidFilter?: string
};

type GetGeneratedQueryHistoryResponse = {
    history?: HistoryEntry[]
};

type HistoryEntry = {
    historyType: GeneratedHistoryEntryType
};

type GeneratedHistoryEntryType = 'query' | 'chart' | 'chat';

type SortOrder = 'asc' | 'desc';

class History {
    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    };

    public async list(
        params: GetGeneratedQueryHistoryRequest = {},
        signal?: AbortSignal
    ): Promise<GetGeneratedQueryHistoryResponse> {
        return this.httpClient.commonFetch<GetGeneratedQueryHistoryResponse>(
            GET_ENDPOINT,
            params,
            signal
        );
    };
};

export default History;
export {
    GeneratedQueryHistoryEntry,
    GeneratedChartHistoryEntry,
    GeneratedChatHistoryEntry,
    GetGeneratedQueryHistoryRequest,
    GetGeneratedQueryHistoryResponse,
    HistoryEntry,
    GeneratedHistoryEntryType,
    SortOrder
};
