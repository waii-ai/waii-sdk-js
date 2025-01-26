import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { ChartGenerationResponse, ChartType } from "../../chart/src/Chart";
import { GetSemanticContextResponse } from "../../semantic-context/src/SemanticContext";
import { GetQueryResultResponse, GeneratedQuery } from "../../query/src/Query";
import { Catalog } from "../../database/src/Database";

const CHAT_ENDPOINT: string = 'chat-message';
const SUBMIT_CHAT_ENDPOINT: string = 'submit-chat-message';
const GET_CHAT_RESPONSE_ENDPOINT: string =  'get-chat-response';

type ChatRequest = {
    ask: string;
    streaming?: boolean;
    parent_uuid?: string;
    chart_type?: ChartType
    parameters?: { [param: string]: any }
}

type ChatResponse = {
    response: string;
    response_data: ChatResponseData;
    is_new?: boolean;
    timestamp_ms: number;
    chat_uuid: string;
    session_title?: string | undefined;
    current_step?: string | undefined;
}

type ChatResponseData = {
    data?: GetQueryResultResponse;
    sql?: GeneratedQuery;
    chart_spec?: ChartGenerationResponse;
    python_plot?: any;
    semantic_context?: GetSemanticContextResponse;
    catalog?: Catalog;
    current_step?: string;
}

type GetObjectRequest = {
    uuid: string;
}

type GetObjectResponse = {
    uuid: string;
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

    public async submitChat(params: ChatRequest, signal?: AbortSignal): Promise<GetObjectResponse> {
        return this.httpClient.commonFetch<GetObjectResponse>(
            SUBMIT_CHAT_ENDPOINT,
            params,
            signal
        );
    }

    public async getChatResponse(
        params: GetObjectRequest,
        signal?: AbortSignal
    ): Promise<ChatResponse> {
        return this.httpClient.commonFetch<ChatResponse>(
            GET_CHAT_RESPONSE_ENDPOINT,
            params,
            signal
        );
    };
}

export default Chat;
export {
    ChatRequest,
    ChatResponse,
    ChatResponseData
};
