import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const MODIFY_DB_ENDPOINT: string = 'update-db-connect-info';
const GET_CATALOG_ENDPOINT: string = 'get-table-definitions';
const UPDATE_TABLE_DESCRIPTION_ENDPOINT: string = 'update-table-description';
const UPDATE_SCHEMA_DESCRIPTION_ENDPOINT: string = 'update-schema-description';
const UPDATE_COLUMN_DESCRIPTION_ENDPOINT: string = 'update-column-description';
const EXTRACT_DATABASE_DOCUMENTATION_ENDPOINT: string = 'extract-database-documentation';
const UPDATE_SIMILARITY_SEARCH_INDEX_ENDPOINT: string = 'update-similarity-search-index';
const GET_SIMILARITY_SEARCH_INDEX_ENDPOINT: string = 'get-similarity-search-index';
const DELETE_SIMILARITY_SEARCH_INDEX_ENDPOINT: string = 'delete-similarity-search-index';
const CHECK_SIMILARITY_SEARCH_INDEX_STATUS_ENDPOINT: string = 'check-similarity-search-index-status';
const GET_SIMILARITY_SEARCH_INDEX_TABLE_ENDPOINT: string = 'get-similarity-search-index-table';


enum DBContentFilterScope {
    schema = "schema",
    table = "table",
    column = "column"
};


enum DBContentFilterType {
    include = "include",
    exclude = "exclude"
};

enum DBContentFilterActionType {
    visibility = "visibility",
    sample_values = "sample_values"
};


type DBContentFilter = {
    filter_scope?: DBContentFilterScope,
    filter_type?: DBContentFilterType,
    ignore_case?: boolean,
    pattern?: string,
    filter_action_type?: DBContentFilterActionType
    search_context?: SearchContext[]
};

type DBConnection = {
    key: string,
    db_type: string
    description?: string,
    account_name?: string,
    username?: string,
    password?: string,
    database?: string,
    warehouse?: string,
    role?: string,
    path?: string,
    host?: string,
    port?: number,
    parameters?: object,
    sample_col_values?: boolean,
    db_content_filters?: DBContentFilter[],
    push?:boolean ,
    always_include_tables?: TableName[],
    embedding_model?: string
};

type ModifyDBConnectionRequest = {
    updated?: DBConnection[],
    removed?: string[],
    validate_before_save?: boolean,
    user_id?: string,
    default_db_connection_key?: string
};

type SchemaIndexingStatus = {
    n_pending_indexing_tables: number,
    n_total_tables: number,
    status: string
};

type DBConnectionIndexingStatus = {
    status?: string,
    schema_status?: { [schema_name: string]: SchemaIndexingStatus; }
};


type ModifyDBConnectionResponse = {
    connectors?: DBConnection[],
    diagnostics?: string[],
    default_db_connection_key?: string,
    connector_status?: { [key: string]: DBConnectionIndexingStatus; }
};

type GetDBConnectionRequest = {
};

type GetDBConnectionResponse = {
    connectors?: DBConnection[],
    diagnostics?: string[],
    default_db_connection_key?: string,
    connector_status?: { [key: string]: DBConnectionIndexingStatus; }
};

type SearchContext = {
    db_name?: string
    schema_name?: string
    table_name?: string
};

type TableDescriptionPair = {
    name: string
    description: string
};

type SchemaDescription = {
    summary?: string
    common_questions?: string[]
    common_tables?: TableDescriptionPair[]
};

type SchemaName = {
    schema_name: string,
    database_name?: string
};

type TableName = {
    table_name: string,
    schema_name?: string,
    database_name?: string
};

type ColumnName = {
    table_name: TableName,
    column_name: string
};

type TableReference = {
    src_table?: TableName[]
    src_cols?: string[],
    ref_table?: TableName[],
    ref_cols?: string[]
};

type Table = {
    name: TableName,
    columns?: Column[],
    comment?: string[],
    last_altered_time?: number,
    refs?: TableReference[],
    description?: string[]
};

type Schema = {
    name: SchemaName
    tables?: Table[]
    description?: SchemaDescription
};

type ColumnSampleValues = {
    values?: [{ value: string, count: number }];
};

type Column = {
    name: string,
    type: string,
    comment?: string,
    sample_values?: ColumnSampleValues[]
    similarity_search_index_id?: string
};

type Catalog = {
    name: string
    schemas?: Schema[]
};

type GetCatalogRequest = {
 search_context?:SearchContext[],
 ask?:string,
};

type GetCatalogResponse = {
    catalogs?: Catalog[],
    debug_info?: { [key: string]: any }

};

type UpdateTableDescriptionRequest = {
    table_name: TableName,
    description: string
};

type ColumnDescription = {
    column_name: string,
    description?: string
}

type TableToColumnDescription = {
    table_name: TableName,
    column_descriptions: ColumnDescription[]
}

type UpdateColumnDescriptionRequest = {
    col_descriptions: TableToColumnDescription[]
}


type UpdateColumnDescriptionResponse = {
}

type UpdateSchemaDescriptionRequest = {
    schema_name: SchemaName,
    description: SchemaDescription
};

type UpdateTableDescriptionResponse = {

};

type UpdateSchemaDescriptionResponse = {};

type ColumnDocumentation = {
    name: string,
    documentation: string
};

type TableDocumentation = {
    name: string,
    table_name?: TableName,
    documentation?: string,
    columns?: ColumnDocumentation[]
};

type SchemaDocumentation = {
    schema_name: SchemaName,
    documentation?: string,
    tables?: TableDocumentation[]
};

type DatabaseDocumentation = {
    database_name: string,
    documentation?: string,
    schemas?: SchemaDocumentation[]
};

enum DocumentContentType {
    html = "html",
    text = "text"
}

type ExtractDatabaseDocumentationRequest = {
    url?: string,
    content?: string,
    search_context?: SearchContext[],
    content_type?: DocumentContentType
};

type ExtractDatabaseDocumentationResponse = {
    database_documentation: DatabaseDocumentation
};

type CheckOperationStatusRequest = {
    op_id: string;
};

enum OperationStatus {
    SUCCEEDED = "succeeded",
    FAILED = "failed",
    IN_PROGRESS = "in_progress",
    NOT_EXISTS = "not_exists"
}

type CheckOperationStatusResponse = {
    op_id: string;
    status: OperationStatus;
    info?: string;
};

type ColumnValue = {
    value: string
    additional_info?: string[]
}

type UpdateSimilaritySearchIndexRequest = {
    values?: ColumnValue[];
    column: ColumnName;
    enable_llm_rerank?: boolean;
    similarity_score_threshold?: number;
    max_matched_values?: number;
    min_matched_values?: number;
};

type UpdateSimilaritySearchIndexResponse = {
    op_id: string;
};

type DeleteSimilaritySearchIndexRequest = {
    column: ColumnName;
};

type DeleteSimilaritySearchIndexResponse = {
    op_id?: string;
};

type SimilaritySearchIndexProperties = {
    enable_llm_rerank?: boolean;
    similarity_score_threshold?: number;
    max_matched_values?: number;
    min_matched_values?: number;
    column?: ColumnName;
    index_id?: string;
};

type GetSimilaritySearchIndexRequest = {
    column: ColumnName
};


type GetSimilaritySearchIndexOnTableResponse = {
    table: TableName;
    columns: ColumnName[];
    search_index_properties: SimilaritySearchIndexProperties[];
};


type GetSimilaritySearchIndexResponse = {
    column: ColumnName;
    values?: ColumnValue[];
    properties?: SimilaritySearchIndexProperties;
};

type GetSimilaritySearchIndexOnTableRequest = {
    table: TableName;
};

enum ConstraintType {
    primary = "primary",
    foreign = "foreign"
}

enum ConstraintDetectorType {
    database = "database",
    manual = "manual", 
    inferred_query_history = "inferred_query_history",
    inferred_liked_query = "inferred_liked_query",
    inferred_llm = "inferred_llm",
    inferred_static = "inferred_static"
}

type Constraint = {
    source?: ConstraintDetectorType,
    table?: TableName,
    cols?: string[],
    constraint_type?: ConstraintType,
    relationship_type?: RelationshipType,
    src_table?: TableName,
    src_cols?: string[],
    comment?: string
};

type TableConstraints = {
    table_name: TableName,
    constraints?: Constraint[],
    constraint_type: ConstraintType,
    constraint_source?: ConstraintDetectorType
};

type UpdateConstraintRequest = {
    updated_constraints?: TableConstraints[];
};

type UpdateConstraintResponse = {
    updated_tables?: TableName[];
};

enum RelationshipType {
    one_to_one = "one_to_one",
    one_to_many = "one_to_many",
    many_to_many = "many_to_many",
    belongs_to = "belongs_to",
    has_one = "has_one",
    has_many = "has_many",
    many_to_one = "many_to_one"
}

class Database {
    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    }

    public async modifyConnections(
        params: ModifyDBConnectionRequest,
        signal?: AbortSignal
    ): Promise<ModifyDBConnectionResponse> {
        return this.httpClient.commonFetch<ModifyDBConnectionResponse>(
            MODIFY_DB_ENDPOINT,
            params,
            signal
        );
    }

    public async getConnections(
        params: GetDBConnectionRequest = {},
        signal?: AbortSignal
    ): Promise<GetDBConnectionResponse> {
        return this.httpClient.commonFetch<GetDBConnectionResponse>(
            MODIFY_DB_ENDPOINT,
            params,
            signal
        );
    };

    public async activateConnection(
        key: string,
        signal?: AbortSignal
    ): Promise<GetDBConnectionResponse> {
        this.httpClient.setScope(key);
        let result = await this.httpClient.commonFetch<ModifyDBConnectionRequest>(
            MODIFY_DB_ENDPOINT, {
            default_db_connection_key: key
        }, signal)
        return result
    };

    public async getCatalogs(
        params: GetCatalogRequest = {},
        signal?: AbortSignal
    ): Promise<GetCatalogResponse> {
        return this.httpClient.commonFetch<GetCatalogResponse>(
            GET_CATALOG_ENDPOINT,
            params,
            signal
        );
    };

    public getDefaultConnection() {
        return this.httpClient.getScope()
    };

    public async updateTableDescription(
        params: UpdateTableDescriptionRequest,
        signal?: AbortSignal
    ): Promise<ModifyDBConnectionResponse> {
        return this.httpClient.commonFetch<UpdateTableDescriptionResponse>(
            UPDATE_TABLE_DESCRIPTION_ENDPOINT,
            params,
            signal
        )
    };

    public async updateSchemaDescription(
        params: UpdateSchemaDescriptionRequest,
        signal?: AbortSignal
    ): Promise<ModifyDBConnectionResponse> {
        return this.httpClient.commonFetch<UpdateSchemaDescriptionResponse>(
            UPDATE_SCHEMA_DESCRIPTION_ENDPOINT,
            params,
            signal
        )
    }

    public async updateColumnDescription(
        params: UpdateColumnDescriptionRequest,
        signal?: AbortSignal
    ): Promise<ModifyDBConnectionResponse> {
        return this.httpClient.commonFetch<UpdateColumnDescriptionResponse>(
            UPDATE_COLUMN_DESCRIPTION_ENDPOINT,
            params,
            signal
        )
    }

    public async extractDatabaseDocumentation(
        params: ExtractDatabaseDocumentationRequest,
        signal?: AbortSignal): Promise<ExtractDatabaseDocumentationResponse> {
        return this.httpClient.commonFetch<ExtractDatabaseDocumentationResponse>(
            EXTRACT_DATABASE_DOCUMENTATION_ENDPOINT,
            params,
            signal
        );
    }

    public async checkSimilaritySearchIndexStatus(
        params: CheckOperationStatusRequest,
        signal?: AbortSignal): Promise<CheckOperationStatusResponse> {
        return this.httpClient.commonFetch<CheckOperationStatusResponse>(
            CHECK_SIMILARITY_SEARCH_INDEX_STATUS_ENDPOINT,
            params,
            signal
        );
    }

    public async updateSimilaritySearchIndex(
        params: UpdateSimilaritySearchIndexRequest,
        signal?: AbortSignal): Promise<UpdateSimilaritySearchIndexResponse> {
        return this.httpClient.commonFetch<UpdateSimilaritySearchIndexResponse>(
            UPDATE_SIMILARITY_SEARCH_INDEX_ENDPOINT,
            params,
            signal
        );
    }

    public async getSimilaritySearchIndex(
        params: GetSimilaritySearchIndexRequest,
        signal?: AbortSignal): Promise<GetSimilaritySearchIndexResponse> {
        return this.httpClient.commonFetch<GetSimilaritySearchIndexResponse>(
            GET_SIMILARITY_SEARCH_INDEX_ENDPOINT,
            params,
            signal
        );
    }

    public async getSimilaritySearchIndexOnTable(
        params: GetSimilaritySearchIndexOnTableRequest,
        signal?: AbortSignal): Promise<GetSimilaritySearchIndexOnTableResponse> {
        return this.httpClient.commonFetch<GetSimilaritySearchIndexOnTableResponse>(
            GET_SIMILARITY_SEARCH_INDEX_TABLE_ENDPOINT,
            params,
            signal
        );
    }

    public async deleteSimilaritySearchIndex(
        params: DeleteSimilaritySearchIndexRequest,
        signal?: AbortSignal): Promise<DeleteSimilaritySearchIndexResponse> {
        return this.httpClient.commonFetch<DeleteSimilaritySearchIndexResponse>(
            DELETE_SIMILARITY_SEARCH_INDEX_ENDPOINT,
            params,
            signal
        );
    }

    public async updateConstraint(
        params: UpdateConstraintRequest,
        signal?: AbortSignal
    ): Promise<UpdateConstraintResponse> {
        return this.httpClient.commonFetch<UpdateConstraintResponse>(
            '/api/update-constraint',
            params,
            signal
        );
    }
};

export default Database;
export {
    DBConnection,
    Catalog,
    Schema,
    Table,
    SchemaName,
    TableName,
    ColumnName,
    TableDescriptionPair,
    TableReference,
    SchemaDescription,
    SearchContext,
    Column,
    ColumnSampleValues,
    GetDBConnectionRequest,
    GetDBConnectionResponse,
    ModifyDBConnectionRequest,
    ModifyDBConnectionResponse,
    GetCatalogRequest,
    GetCatalogResponse,
    DBConnectionIndexingStatus,
    SchemaIndexingStatus,
    DBContentFilter,
    DBContentFilterScope,
    DBContentFilterType,
    DBContentFilterActionType,
    ColumnDocumentation,
    TableDocumentation,
    SchemaDocumentation,
    DatabaseDocumentation,
    ExtractDatabaseDocumentationRequest,
    ExtractDatabaseDocumentationResponse,
    DocumentContentType,
    CheckOperationStatusRequest,
    CheckOperationStatusResponse,
    UpdateSimilaritySearchIndexRequest,
    UpdateSimilaritySearchIndexResponse,
    GetSimilaritySearchIndexRequest,
    GetSimilaritySearchIndexResponse,
    GetSimilaritySearchIndexOnTableRequest,
    GetSimilaritySearchIndexOnTableResponse,
    DeleteSimilaritySearchIndexRequest,
    DeleteSimilaritySearchIndexResponse,
    ConstraintType,
    ConstraintDetectorType,
    Constraint,
    TableConstraints,
    UpdateConstraintRequest,
    UpdateConstraintResponse,
    RelationshipType
}
