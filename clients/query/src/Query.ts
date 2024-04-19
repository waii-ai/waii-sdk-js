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
const TRANSCODE_ENDPOINT: string = 'transcode-query';
const GENERATE_QUESTION_ENDPOINT: string = 'generate-questions';
const GET_SIMILAR_QUERY_ENDPOINT: string = 'get-similar-query';

type Tweak = {
    sql?: string,
    ask?: string
};

type QueryGenerationRequest = {
    search_context?: SearchContext[],
    tweak_history?: Tweak[],
    ask?: string,
    uuid?: string,
    dialect?: string,
    parent_uuid?: string,
    model?: string
};

type DescribeQueryRequest = {
    search_context?: SearchContext[],
    current_schema?: string,
    query?: string
};

type DescribeQueryResponse = {
    summary?: string,
    detailed_steps?: string[],
    tables?: TableName[]
};

type DiffQueryRequest = {
    search_context?: SearchContext[],
    current_schema?: string,
    query?: string,
    previous_query?: string
};

type DiffQueryResponse = {
    summary?: string,
    detailed_steps?: string[],
    tables?: TableName[],
    what_changed?: string
};

type CompilationError = {
    message: string,
    line?: number[]
};

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
    timestamp_ms?: number,
    debug_info?: { [a: string]: any }
};

type SyncRunQueryRequest = {
    query: string,
    timeout_ms?: number,
    max_returned_rows?: number,
    current_schema?: SchemaName
};

type Query_ = {
    uuid: string,
    ask: string,
    query: string,
    detailed_steps?: string[]
};

type SimilarQueryResponse = {
    qid?: number,
    equivalent?: boolean,
    query?: Query_
}

type RunQueryRequest = {
    query: string,
    session_id?: string,
    current_schema?: SchemaName,
    session_parameters?: { [a: string]: any }
};

type RunQueryResponse = {
    query_id?: string,
    error_details?: object,
    detected_schemas?: string[]
};

type GetQueryResultRequest = {
    query_id: string
};

type CancelQueryRequest = {
    query_id: string
};

type CancelQueryResponse = {
};

type GetQueryResultResponse = {
    rows?: object[],
    more_rows?: number,
    column_definitions?: Column[],
    query_uuid?: string
};

type LikeQueryRequest = {
    query_uuid: string,
    liked: boolean
};

type LikeQueryResponse = {
};

type AutoCompleteRequest = {
    text: string,
    cursor_offset?: number,
    dialect?: string,
    search_context?: SearchContext[],
    max_output_tokens?: number
};

type AutoCompleteResponse = {
    text?: string
};

type QueryPerformanceRequest = {
    query_id: string
};

type QueryPerformanceResponse = {
    summary: string[],
    recommendations: string[],
    query_text: string,
    execution_time_ms?: number,
    compilation_time_ms?: number
};

type TranscodeQueryRequest = {
    search_context?: SearchContext[],
    ask?: string,
    source_dialect: string,
    source_query: string,
    target_dialect: string
};

type GenerateQuestionRequest = {
    schema_name: string,
    n_questions?: number,
    complexity?: string
};

type GeneratedQuestion = {
    question: string,
    complexity: string,
    tables?: TableName[]
};

type GenerateQuestionResponse = {
    questions?: GeneratedQuestion[]
};

class Query {
    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    };

    public async generate(
        params: QueryGenerationRequest,
        signal?: AbortSignal
    ): Promise<GeneratedQuery> {
        return this.httpClient.commonFetch<GeneratedQuery>(
            GENERATE_ENDPOINT,
            params,
            signal
        );
    }

    public async transcode(
        params: TranscodeQueryRequest,
        signal?: AbortSignal
    ): Promise<GeneratedQuery> {
        return this.httpClient.commonFetch<GeneratedQuery>(
            TRANSCODE_ENDPOINT,
            params,
            signal
        );
    };

    public async run(
        params: RunQueryRequest,
        signal?: AbortSignal
    ): Promise<GetQueryResultResponse> {
        return this.httpClient.commonFetch<GetQueryResultResponse>(
            RUN_ENDPOINT,
            params,
            signal
        );
    };

    public async like(
        params: LikeQueryRequest,
        signal?: AbortSignal
    ): Promise<LikeQueryResponse> {
        return this.httpClient.commonFetch<LikeQueryResponse>(
            FAVORITE_ENDPOINT,
            params,
            signal
        );
    };

    public async submit(
        params: RunQueryRequest,
        signal?: AbortSignal
    ): Promise<RunQueryResponse> {
        return this.httpClient.commonFetch<RunQueryResponse>(
            SUBMIT_ENDPOINT,
            params,
            signal
        );
    };

    public async getResults(
        params: GetQueryResultRequest,
        signal?: AbortSignal
    ): Promise<GetQueryResultResponse> {
        return this.httpClient.commonFetch<GetQueryResultResponse>(
            RESULTS_ENDPOINT,
            params,
            signal
        );
    };

    public async cancel(
        params: CancelQueryRequest,
        signal?: AbortSignal
    ): Promise<CancelQueryResponse> {
        return this.httpClient.commonFetch<CancelQueryResponse>(
            CANCEL_ENDPOINT,
            params,
            signal
        );
    };

    public async describe(
        params: DescribeQueryRequest,
        signal?: AbortSignal
    ): Promise<DescribeQueryResponse> {
        return this.httpClient.commonFetch<DescribeQueryResponse>(
            DESCRIBE_ENDPOINT,
            params,
            signal
        );
    };

    public async autoComplete(
        params: AutoCompleteRequest,
        signal?: AbortSignal
    ): Promise<AutoCompleteResponse> {
        return this.httpClient.commonFetch<AutoCompleteResponse>(
            AUTOCOMPLETE_ENDPOINT,
            params,
            signal
        );
    }
    public async diff(
        params: DiffQueryRequest,
        signal?: AbortSignal
    ): Promise<DiffQueryResponse> {
        return this.httpClient.commonFetch<DiffQueryResponse>(
            DIFF_ENDPOINT,
            params,
            signal
        );
    };

    public async analyzePerformance(
        params: QueryPerformanceRequest,
        signal?: AbortSignal
    ): Promise<QueryPerformanceResponse> {
        return this.httpClient.commonFetch<QueryPerformanceResponse>(
            PERF_ENDPOINT,
            params,
            signal
        );
    };

    public async generateQuestion(
        params: GenerateQuestionRequest,
        signal?: AbortSignal
    ): Promise<GenerateQuestionResponse> {
        return this.httpClient.commonFetch<GenerateQuestionResponse>(
            GENERATE_QUESTION_ENDPOINT,
            params,
            signal
        );
    };

        public async getSimilarQuery(
        params: GenerateQuestionRequest,
        signal?: AbortSignal
        ){
        return this.httpClient.commonFetch<SimilarQueryResponse>(
            GET_SIMILAR_QUERY_ENDPOINT,
            params,
            signal
        );
    }
};

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
    QueryPerformanceResponse,
    GenerateQuestionRequest,
    GeneratedQuestion,
    GenerateQuestionResponse,
    SimilarQueryResponse
};
