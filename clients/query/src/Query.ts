import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { SearchContext, TableName, Column, SchemaName } from "../../database/src/Database"
import { SemanticStatement } from "../../semantic-context/src/SemanticContext"

const GENERATE_ENDPOINT: string = 'generate-query';
const RUN_ENDPOINT: string = 'run-query';
const SUBMIT_ENDPOINT: string = 'submit-query'
const FAVORITE_ENDPOINT: string = 'like-query';
const DESCRIBE_ENDPOINT: string = 'describe-query';
const DIFF_ENDPOINT: string = 'diff-query';
const RESULTS_ENDPOINT: string = 'get-query-result';
const CANCEL_ENDPOINT: string = 'cancel-query';
const AUTOCOMPLETE_ENDPOINT: string = 'auto-complete';
const PERF_ENDPOINT: string = 'get-query-performance';

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

type DiffQueryRequest = {
    search_context?: SearchContext[],
    current_schema?: string
    query?: string
    previous_query?: string
}

type DiffQueryResponse = {
    summary?: string
    detailed_steps?: string[]
    tables?: TableName[]
    what_changed?: string
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
    max_returned_rows?: number,
    current_schema?: SchemaName
}

type RunQueryRequest = {
    query: string,
    session_id?: string,
    current_schema?: SchemaName
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

type AutoCompleteRequest = {
    text: string,
    cursor_offset?: number,
    dialect?: string,
    search_context?: SearchContext[],
    max_output_tokens?: number
}

type AutoCompleteResponse = {
    text?: string
}

type QueryPerformanceRequest = {
    query_id: string
}

type QueryPerformanceResponse = {
    summary: string[],
    recommendations: string[]
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
            autoComplete: async (
                params: AutoCompleteRequest,
                signal?: AbortSignal
            ): Promise<AutoCompleteResponse> => WaiiHttpClient.getInstance().commonFetch<AutoCompleteResponse>(
                AUTOCOMPLETE_ENDPOINT,
                params,
                signal
            ),
            diff: async (
                params: DiffQueryRequest, 
                signal?: AbortSignal
            ): Promise<DiffQueryResponse> => WaiiHttpClient.getInstance().commonFetch<DiffQueryResponse>(
                    DIFF_ENDPOINT,
                    params,
                    signal
            ),
            analyzePerformance: async (
                params: QueryPerformanceRequest, 
                signal?: AbortSignal
            ): Promise<QueryPerformanceResponse> => WaiiHttpClient.getInstance().commonFetch<QueryPerformanceResponse>(
                    PERF_ENDPOINT,
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
    Tweak,
    AutoCompleteRequest,
    AutoCompleteResponse,
    DiffQueryRequest,
    DiffQueryResponse,
    QueryPerformanceRequest,
    QueryPerformanceResponse
}
