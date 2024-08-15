import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { GeneratedQuery, QueryGenerationRequest } from "../../query/src/Query";
import { ChartGenerationRequest, ChartGenerationResponse } from "../../chart/src/Chart";
import { ChatRequest, ChatResponse } from "../../chat/src/Chat";

const LIST_ENDPOINT: string = 'get-generated-query-history';
const GET_ENDPOINT: string = 'get-history';

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
    included_types?: GeneratedHistoryEntryType[],
    limit?: number,
    offset?: number,
    timestamp_sort_order?: SortOrder,
    uuid_filter?: string
    liked_query_filter?: boolean
};

type GetGeneratedQueryHistoryResponse = {
    history?: HistoryEntry[]
};

type GetGeneratedQueryHistoryV2Response = {
    history?: (GeneratedQueryHistoryEntry | GeneratedChartHistoryEntry | GeneratedChatHistoryEntry)[]
};

type HistoryEntry = {
    history_type: GeneratedHistoryEntryType,
    timestamp_ms?: number
} & (GeneratedQueryHistoryEntry | GeneratedChartHistoryEntry | GeneratedChatHistoryEntry);

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
            LIST_ENDPOINT,
            params,
            signal
        );
    };

    public async get(
        params: GetGeneratedQueryHistoryRequest = {},
        signal?: AbortSignal
    ): Promise<GetGeneratedQueryHistoryV2Response> {
        const response = await this.httpClient.commonFetch<GetGeneratedQueryHistoryResponse>(
            GET_ENDPOINT,
            params,
            signal
        );

        let _history: (GeneratedQueryHistoryEntry | GeneratedChartHistoryEntry | GeneratedChatHistoryEntry)[] = [];

        if (response.history && response.history.length > 0) {
            _history = response.history.map(entry => {
                switch (entry.history_type) {
                    case 'query':
                        return entry as GeneratedQueryHistoryEntry;
                    case 'chart':
                        return entry as GeneratedChartHistoryEntry;
                    case 'chat':
                        return entry as GeneratedChatHistoryEntry;
                }
            });
        }

        return { history: _history };
    }
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
