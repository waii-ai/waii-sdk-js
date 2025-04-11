import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import { v4 as uuidv4 } from 'uuid';

const MODIFY_ENDPOINT: string = 'update-semantic-context';
const GET_ENDPOINT: string = 'get-semantic-context';
const INGEST_DOCUMENT_ENDPOINT: string = 'ingest-document';
const LIST_PENDING_INGEST_DOCUMENT_JOBS_ENDPOINT: string = 'list-pending-ingest-document-jobs';
const GET_INGEST_DOCUMENT_JOB_STATUS_ENDPOINT: string = 'get-ingest-document-job-status';
const ENABLE_SEMANTIC_CONTEXT_ENDPOINT: string = 'enable-semantic-context';
const DISABLE_SEMANTIC_CONTEXT_ENDPOINT: string = 'disable-semantic-context';

enum DocumentContentType {
    PDF = 'pdf',
    TEXT = 'text',
    HTML = 'html',
    // Add other content types as needed
}

enum IngestDocumentJobStatus {
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    FAILED = 'failed'
}
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

// New types for document ingestion
type LLMBasedRequest = {
    // Base properties for LLM-based requests
    // Add any necessary base properties here
}

type IngestDocumentRequest = LLMBasedRequest & {
    content?: string
    url?: string
    content_type?: DocumentContentType
}

type IngestDocumentResponse = {
    ingest_document_job_id: string
}


type GetIngestDocumentJobStatusRequest = {
    ingest_document_job_id: string
}

type GetIngestDocumentJobStatusResponse = {
    status: IngestDocumentJobStatus
    // Additional status information if needed
}

// New types for enabling/disabling semantic context
type EnableSemanticContextRequest = {
    statement_ids: string[]
}

type GetAllPendingIngestDocumentJobsRequest = {
}

type GetAllPendingIngestDocumentJobsResponse = {
    ingest_document_job_statuses: IngestDocumentJobStatusWithJobId[]
}

type IngestDocumentJobStatusWithJobId = {
    ingest_document_job_id: string
    status: IngestDocumentJobStatus
    message?: string
    progress?: number
}

type EnableSemanticContextResponse = {
    statement_ids: string[] // successfully enabled statement ids
}

type DisableSemanticContextRequest = {
    statement_ids: string[]
}

type DisableSemanticContextResponse = {
    statement_ids: string[] // successfully disabled statement ids
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

    /**
     * Ingests a document for processing
     */
    public async ingestDocument(
        params: IngestDocumentRequest,
        signal?: AbortSignal
    ): Promise<IngestDocumentResponse> {
        return this.httpClient.commonFetch<IngestDocumentResponse>(
            INGEST_DOCUMENT_ENDPOINT,
            params,
            signal
        );
    };

    /**
     * Gets the status of a document ingestion job
     */
    public async getIngestDocumentJobStatus(
        params: GetIngestDocumentJobStatusRequest,
        signal?: AbortSignal
    ): Promise<GetIngestDocumentJobStatusResponse> {
        return this.httpClient.commonFetch<GetIngestDocumentJobStatusResponse>(
            GET_INGEST_DOCUMENT_JOB_STATUS_ENDPOINT,
            params,
            signal
        );
    };

    /**
     * Gets all pending ingest document jobs
     */
    public async getAllPendingIngestDocumentJobs(
        params: GetAllPendingIngestDocumentJobsRequest,
        signal?: AbortSignal
    ): Promise<GetAllPendingIngestDocumentJobsResponse> {
        return this.httpClient.commonFetch<GetAllPendingIngestDocumentJobsResponse>(
            LIST_PENDING_INGEST_DOCUMENT_JOBS_ENDPOINT,
            params,
            signal
        );
    };

    /**
     * Enables semantic contexts by statement IDs
     */
    public async enableSemanticContext(
        params: EnableSemanticContextRequest,
        signal?: AbortSignal
    ): Promise<EnableSemanticContextResponse> {
        return this.httpClient.commonFetch<EnableSemanticContextResponse>(
            ENABLE_SEMANTIC_CONTEXT_ENDPOINT,
            params,
            signal
        );
    };

    /**
     * Disables semantic contexts by statement IDs
     */
    public async disableSemanticContext(
        params: DisableSemanticContextRequest,
        signal?: AbortSignal
    ): Promise<DisableSemanticContextResponse> {
        return this.httpClient.commonFetch<DisableSemanticContextResponse>(
            DISABLE_SEMANTIC_CONTEXT_ENDPOINT,
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
    DocumentContentType,
    IngestDocumentJobStatus,
    SemanticStatement,
    ModifySemanticContextRequest,
    ModifySemanticContextResponse,
    GetSemanticContextRequestFilter,
    GetSemanticContextRequest,
    GetSemanticContextResponse,
    IngestDocumentRequest,
    IngestDocumentResponse,
    GetIngestDocumentJobStatusRequest,
    GetIngestDocumentJobStatusResponse,
    EnableSemanticContextRequest,
    EnableSemanticContextResponse,
    DisableSemanticContextRequest,
    DisableSemanticContextResponse,
    GetAllPendingIngestDocumentJobsRequest,
    GetAllPendingIngestDocumentJobsResponse,
    IngestDocumentJobStatusWithJobId
};
