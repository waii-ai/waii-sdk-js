import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { v4 as uuidv4 } from 'uuid';

const MODIFY_ENDPOINT: string = 'update-semantic-context';
const GET_ENDPOINT: string = 'get-semantic-context';

class SemanticStatement {
    id?: string
    scope: string
    statement: string
    labels?: string[]
    always_include?: boolean
    lookup_summaries?: string[]
    summarization_prompt?: string

    public constructor(
        scope: string = '*',
        statement: string,
        labels: string[] = [],
        always_include: boolean = true,
        lookup_summaries: string[] = [],
        summarization_prompt: string = '',
        id: string = ''
    ) {
        if (id) {
            this.id = id;
        } else {
            this.id = uuidv4();
        }
        this.scope = scope;
        this.statement = statement;
        this.labels = labels;
        this.always_include = always_include;
        this.lookup_summaries = lookup_summaries;
        this.summarization_prompt = summarization_prompt;
    }
}

type ModifySemanticContextRequest = {
    updated?: SemanticStatement[],
    deleted?: string[]
}

type ModifySemanticContextResponse = {
    updated?: SemanticStatement[],
    deleted?: string[]
}

type GetSemanticContextRequestFilter = {
    labels?: string[],
    scope?: string,
    statement?: string,
    always_include?: boolean
}

type GetSemanticContextRequest = {
    filter?: GetSemanticContextRequestFilter
    search_text?: string
    offset?: number
    limit?: number
}

type GetSemanticContextResponse = {
    semantic_context?: SemanticStatement[]
    available_statements?: number
}

class SemanticContext {

    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    }

    public async modifySemanticContext(
        params: ModifySemanticContextRequest,
        signal?: AbortSignal
    ): Promise<ModifySemanticContextResponse> {
        return this.httpClient.commonFetch<ModifySemanticContextResponse>(
            MODIFY_ENDPOINT,
            params,
            signal
        );
    };

    public getSemanticContext(
        params: GetSemanticContextRequest = {},
        signal?: AbortSignal
    ): Promise<GetSemanticContextResponse> {
        return this.httpClient.commonFetch<GetSemanticContextResponse>(
            GET_ENDPOINT,
            params,
            signal
        );
    };
};

export default SemanticContext;
export {
    SemanticStatement,
    ModifySemanticContextRequest,
    ModifySemanticContextResponse,
    GetSemanticContextRequestFilter,
    GetSemanticContextRequest,
    GetSemanticContextResponse
};
