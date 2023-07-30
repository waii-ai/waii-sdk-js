import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { SearchContext, TableName, Column } from "../../database/src/Database"
import { SemanticStatement } from "../../semantic-context/src/SemanticContext"

const GENERATE_ENDPOINT: string = 'generate-query';
const RUN_ENDPOINT: string = 'run-query';
const SUBMIT_ENDPOINT: string = 'submit-query'
const FAVORITE_ENDPOINT: string = 'like-query';
const DESCRIBE_ENDPOINT: string = 'describe-query';
const RESULTS_ENDPOINT: string = 'get-query-result';
const CANCEL_ENDPOINT: string = 'cancel-query';

type Tweak = {
    sql?: string,
    ask?: string
}

type QueryGenerationRequest = {
    search_context?: SearchContext[],
    tweak_history?: Tweak[],
    ask?: string
    uuid?: string
    dialect?: string
    parent_uuid?: string
}

type DescribeQueryRequest = {
    search_context?: SearchContext[],
    current_schema?: string
    query?: string
}

type DescribeQueryResponse = {
    summary?: string
    detailed_steps?: string[]
    tables?: TableName[]
}

type CompilationError = {
    message: string,
    line?: number[]
}

type GeneratedQuery = {
    uuid?: string,
    liked?: boolean,
    tables?: TableName[],
    semantic_context?: SemanticStatement[],
    query?: string,
    detailed_steps?: string[],
    what_changed?: string,
    compilation_errors?: CompilationError[],
    is_new?: boolean,
    timestamp_ms?: number
}

type SyncRunQueryRequest = {
    query: string,
    timeout_ms?: number,
    max_returned_rows?: number
}

type RunQueryRequest = {
    query: string,
    session_id?: string
}

type RunQueryResponse = {
    query_id?: string
}

type GetQueryResultRequest = {
    query_id: string
}

type CancelQueryRequest = {
    query_id: string
}

type CancelQueryResponse = {
}

type GetQueryResultResponse = {
    rows?: object[],
    more_rows?: number,
    column_definitions?: Column[],
    query_uuid?: string
}

type LikeQueryRequest = {
    query_uuid: string
    liked: boolean
}

type LikeQueryResponse = {
}

export let Query = (
    function () {
        return {
            generate: async (
                params: QueryGenerationRequest,
                signal?: AbortSignal
            ): Promise<GeneratedQuery> => WaiiHttpClient.getInstance().commonFetch<GeneratedQuery>(
                GENERATE_ENDPOINT,
                params,
                signal
            ),
            run: async (
                params: RunQueryRequest,
                signal?: AbortSignal
            ): Promise<GetQueryResultResponse> => WaiiHttpClient.getInstance().commonFetch<GetQueryResultResponse>(
                RUN_ENDPOINT,
                params,
                signal
            ),
            like: async (
                params: LikeQueryRequest,
                signal?: AbortSignal
            ): Promise<LikeQueryResponse> => WaiiHttpClient.getInstance().commonFetch<LikeQueryResponse>(
                FAVORITE_ENDPOINT,
                params,
                signal
            ),
            submit: async (
                params: RunQueryRequest,
                signal?: AbortSignal
            ): Promise<RunQueryResponse> => WaiiHttpClient.getInstance().commonFetch<RunQueryResponse>(
                SUBMIT_ENDPOINT,
                params,
                signal
            ),
            getResults: async (
                params: GetQueryResultRequest,
                signal?: AbortSignal
            ): Promise<GetQueryResultResponse> => WaiiHttpClient.getInstance().commonFetch<GetQueryResultResponse>(
                RESULTS_ENDPOINT,
                params,
                signal
            ),
            cancel: async (
                params: CancelQueryRequest,
                signal?: AbortSignal
            ): Promise<CancelQueryResponse> => WaiiHttpClient.getInstance().commonFetch<CancelQueryResponse>(
                CANCEL_ENDPOINT,
                params,
                signal
            ),
            describe: async (
                params: DescribeQueryRequest,
                signal?: AbortSignal
            ): Promise<DescribeQueryResponse> => WaiiHttpClient.getInstance().commonFetch<DescribeQueryResponse>(
                DESCRIBE_ENDPOINT,
                params,
                signal
            ),
        }
    }
)();

export default Query;
export {
    GetQueryResultRequest,
    GetQueryResultResponse,
    GeneratedQuery,
    QueryGenerationRequest,
    RunQueryRequest,
    RunQueryResponse,
    LikeQueryRequest,
    LikeQueryResponse,
    DescribeQueryRequest,
    DescribeQueryResponse,
    CancelQueryRequest,
    CancelQueryResponse,
    Tweak
}