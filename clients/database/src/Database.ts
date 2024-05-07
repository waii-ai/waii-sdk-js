import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const MODIFY_DB_ENDPOINT: string = 'update-db-connect-info';
const GET_CATALOG_ENDPOINT: string = 'get-table-definitions';
const UPDATE_TABLE_DESCRIPTION_ENDPOINT: string = 'update-table-description';
const UPDATE_SCHEMA_DESCRIPTION_ENDPOINT: string = 'update-schema-description';
const EXTRACT_DATABASE_DOCUMENTATION_ENDPOINT: string = 'extract-database-documentation';

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
    db_content_filters?: DBContentFilter[]
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
};

type Catalog = {
    name: string
    schemas?: Schema[]
};

type GetCatalogRequest = {
};

type GetCatalogResponse = {
    catalogs?: Catalog[],
};

type UpdateTableDescriptionRequest = {
    table_name: TableName,
    description: string
};

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

    public async extractDatabaseDocumentation(
        params: ExtractDatabaseDocumentationRequest,
        signal?: AbortSignal): Promise<ExtractDatabaseDocumentationResponse> {
        return this.httpClient.commonFetch<ExtractDatabaseDocumentationResponse>(
            EXTRACT_DATABASE_DOCUMENTATION_ENDPOINT,
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
    ExtractDatabaseDocumentationResponse
}
