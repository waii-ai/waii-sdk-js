import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { v4 as uuidv4 } from 'uuid';

const MODIFY_ENDPOINT: string = 'update-semantic-context';
const GET_ENDPOINT: string = 'get-semantic-context';
const GET_KNOWLEDGE_GRAPH_ENDPOINT: string = 'get-knowledge-graph';
class SemanticStatement {
    id?: string
    scope: string
    statement: string
    labels?: string[]
    always_include?: boolean
    lookup_summaries?: string[]
    summarization_prompt?: string
    critical?: boolean

    public constructor(
        scope: string = '*',
        statement: string,
        labels: string[] = [],
        always_include: boolean = true,
        lookup_summaries: string[] = [],
        summarization_prompt: string = '',
        id: string = '',
        critical: boolean = false
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
        this.critical = critical;
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

type GetKnowledgeGraphRequest = {
    ask?: string
}

type GetKnowledgeGraphResponse = {
    graph: {
        nodes: Array<{
            id: string;
            display_name: string;
            entity_type: string;
            entity: {
                entity_type: string;
                [key: string]: any;
            }
        }>;
        edges: Array<{
            edge_type: string;
            source_id: string;
            target_id: string;
            directed: boolean;
            edge_entity: any | null;
        }>;
    }
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

    public getKnowledgeGraph(
        params: GetKnowledgeGraphRequest = {},
        signal?: AbortSignal
    ): Promise<GetKnowledgeGraphResponse> {
        return this.httpClient.commonFetch<GetKnowledgeGraphResponse>(
            GET_KNOWLEDGE_GRAPH_ENDPOINT,
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
