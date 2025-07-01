/**
 * Copyright 2023–2025 Waii, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { ChartGenerationResponse, ChartType } from "../../chart/src/Chart";
import {GetSemanticContextResponse, SemanticStatement} from "../../semantic-context/src/SemanticContext";
import { GetQueryResultResponse, GeneratedQuery } from "../../query/src/Query";
import { Catalog } from "../../database/src/Database";

const CHAT_ENDPOINT: string = 'chat-message';
const SUBMIT_CHAT_ENDPOINT: string = 'submit-chat-message';
const GET_CHAT_RESPONSE_ENDPOINT: string =  'get-chat-response';

type SearchContext = {
    db_name?: string
    schema_name?: string
    table_name?: string
};

type ChatRequest = {
    ask: string;
    streaming?: boolean;
    parent_uuid?: string;
    chart_type?: ChartType
    parameters?: { [param: string]: any }
    search_context?: SearchContext[]
    additional_context?: SemanticStatement[]
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
    query?: GeneratedQuery;
    chart?: ChartGenerationResponse;
    python_plot?: any;
    semantic_context?: GetSemanticContextResponse;
    tables?: Catalog;
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
