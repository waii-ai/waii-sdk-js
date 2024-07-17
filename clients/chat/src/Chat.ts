import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { ChartGenerationResponse } from "../../chart/src/Chart";
import { GetSemanticContextResponse } from "../../semantic-context/src/SemanticContext";
import { GetQueryResultResponse, GeneratedQuery } from "../../query/src/Query";
import { Catalog } from "../../database/src/Database";

const CHAT_ENDPOINT: string = 'chat-message';

type ChatRequest = {
    ask: string;
    streaming?: boolean;
    parentUuid?: string;
}

type ChatResponse = {
    response: string;
    responseData: ChatResponseData;
    isNew?: boolean;
    timestamp: number;
    chatUuid: string;
}

type ChatResponseData = {
    data?: GetQueryResultResponse;
    sql?: GeneratedQuery;
    chartSpec?: ChartGenerationResponse;
    pythonPlot?: any;
    semanticContext?: GetSemanticContextResponse;
    catalog?: Catalog;
}

class Chat {

    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    }

    public async chat(params: ChatRequest, signal?: AbortSignal): Promise<ChatResponse> {
        return this.httpClient.commonFetch<ChatResponse>(
            CHAT_ENDPOINT,
            params,
            signal
        );
    }
}

export default Chat;
export {
    ChatRequest,
    ChatResponse,
    ChatResponseData
};
