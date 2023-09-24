import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import WAII from "../../../src/waii-sdk";

const MODIFY_DB_ENDPOINT: string = 'update-db-connect-info';
const GET_CATALOG_ENDPOINT: string = 'get-table-definitions';
const UPDATE_TABLE_DESCRIPTION_ENDPOINT: string = 'update-table-description';
const UPDATE_SCHEMA_DESCRIPTION_ENDPOINT: string = 'update-schema-description';

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
    parameters?: object,
    sample_col_values?: boolean
}

type ModifyDBConnectionRequest = {
    updated?: DBConnection[],
    removed?: string[],
    validate_before_save?: boolean,
    user_id?: string,
    default_db_connection_key?: string
}

type SchemaIndexingStatus = {
    n_pending_indexing_tables: number,
    n_total_tables: number,
    status: string
}

type DBConnectionIndexingStatus = {
    status?: string,
    schema_status?: { string: SchemaIndexingStatus}
}


type ModifyDBConnectionResponse = {
    connectors?: DBConnection[],
    diagnostics?: string[],
    default_db_connection_key?: string,
    connector_status?: {string: DBConnectionIndexingStatus}
}

type GetDBConnectionRequest = {
}

type GetDBConnectionResponse = {
    connectors?: DBConnection[],
    diagnostics?: string[],
    default_db_connection_key?: string,
    connector_status?: {string: DBConnectionIndexingStatus}
}

type SearchContext = {
    db_name?: string
    schema_name?: string
    table_name?: string
}

type TableDescriptionPair = {
    name: string
    description: string
}

type SchemaDescription = {
    summary?: string
    common_questions?: string[]
    common_tables?: TableDescriptionPair[]
}

type SchemaName = {
    schema_name: string,
    database_name?: string
}

type TableName = {
    table_name: string,
    schema_name?: string,
    database_name?: string
}

type TableReference = {
    src_table?: TableName[]
    src_cols?: string[],
    ref_table?: TableName[],
    ref_cols?: string[]
}

type Table = {
    name: TableName,
    columns?: Column[],
    comment?: string[],
    last_altered_time?: number,
    refs?: TableReference[],
    description?: string[]
}

type Schema = {
    name: SchemaName
    tables?: Table[]
    description?: SchemaDescription
}

type ColumnSampleValues = {
    values?: [{value: string, count: number}];
}

type Column = {
    name: string,
    type: string,
    comment?: string,
    sample_values?: ColumnSampleValues[]
}

type Catalog = {
    name: string
    schemas?: Schema[]
}

type GetCatalogRequest = {
}

type GetCatalogResponse = {
    catalogs?: Catalog[],
}

type UpdateTableDescriptionRequest = {
    table_name: TableName,
    description: string
}

type UpdateSchemaDescriptionRequest = {
    schema_name: SchemaName,
    description: SchemaDescription
}

type UpdateTableDescriptionResponse = {

}

type UpdateSchemaDescriptionResponse = {

}

export let Database = (
    function () {
        return {
            modifyConnections: async (
                params: ModifyDBConnectionRequest,
                signal?: AbortSignal
            ): Promise<ModifyDBConnectionResponse> => WaiiHttpClient.getInstance().commonFetch<ModifyDBConnectionResponse>(
                MODIFY_DB_ENDPOINT,
                params,
                signal
            ),
            getConnections: async (
                params: GetDBConnectionRequest = {},
                signal?: AbortSignal
            ): Promise<GetDBConnectionResponse> => WaiiHttpClient.getInstance().commonFetch<GetDBConnectionResponse>(
                MODIFY_DB_ENDPOINT,
                params,
                signal
            ),

            activateConnection: async (
                key: string,
                signal?: AbortSignal
            ): Promise<GetDBConnectionResponse> => {
                WaiiHttpClient.getInstance().setScope(key)
                let result = await WaiiHttpClient.getInstance().commonFetch<ModifyDBConnectionRequest>(
                    MODIFY_DB_ENDPOINT, {
                        default_db_connection_key: key
                    }, signal)
                return result
            },

            getCatalogs: async (
                params: GetCatalogRequest = {},
                signal?: AbortSignal
            ): Promise<GetCatalogResponse> => WaiiHttpClient.getInstance().commonFetch<GetCatalogResponse>(
                GET_CATALOG_ENDPOINT,
                params,
                signal
            ),

            getDefaultConnection: () => {
                return WaiiHttpClient.getInstance().getScope()
            },

            updateTableDescription: async (
                params: UpdateTableDescriptionRequest,
                signal?: AbortSignal
            ): Promise<ModifyDBConnectionResponse> => WaiiHttpClient.getInstance().commonFetch<UpdateTableDescriptionResponse>(
                UPDATE_TABLE_DESCRIPTION_ENDPOINT,
                params,
                signal
            ),

            updateSchemaDescription: async (
                params: UpdateSchemaDescriptionRequest,
                signal?: AbortSignal
            ): Promise<ModifyDBConnectionResponse> => WaiiHttpClient.getInstance().commonFetch<UpdateSchemaDescriptionResponse>(
                UPDATE_SCHEMA_DESCRIPTION_ENDPOINT,
                params,
                signal
            )
        }
    }
)();

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
    GetCatalogResponse
}
