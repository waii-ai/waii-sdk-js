import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const MODIFY_DB_ENDPOINT: string = 'update-db-connect-info';
const GET_CATALOG_ENDPOINT: string = 'get-table-definitions';

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
    parameters?: object
}

type ModifyDBConnectionRequest = {
    updated?: DBConnection[],
    removed?: string[],
    validate_before_save?: boolean,
    user_id?: string
}

type ModifyDBConnectionResponse = {
    connectors?: DBConnection[],
    diagnostics?: string[]
}

type GetDBConnectionRequest = {
}

type GetDBConnectionResponse = {
    connectors?: DBConnection[],
    diagnostics?: string[]
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
    description?: SchemaDescription[]
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
    schemas?: Schema
}

type GetCatalogRequest = {
}

type GetCatalogResponse = {
    catalogs?: Catalog[],
}


export let Database = (
    function () {
        return {
            modifyConnections: (
                params: ModifyDBConnectionRequest,
                callback: (result: ModifyDBConnectionResponse) => void,
                error: (detail: GetDBConnectionRequest) => void
            ): AbortController => {
                return WaiiHttpClient.getInstance().commonFetch(
                    MODIFY_DB_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
            getConnections: (
                params: object = {},
                callback: (result: GetDBConnectionResponse) => void,
                error: (detail: object) => void
            ): AbortController => {
                return WaiiHttpClient.getInstance().commonFetch(
                    MODIFY_DB_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
            activateConnection: (
                key: string
            ): void => {
                WaiiHttpClient.getInstance().setScope(key);
            },
            getCatalogs: (
                params: GetCatalogRequest = {},
                callback: (result: GetCatalogResponse) => void,
                error: (detail: object) => void
            ): AbortController => {
                return WaiiHttpClient.getInstance().commonFetch(
                    GET_CATALOG_ENDPOINT,
                    params,
                    callback,
                    error
                );
            },
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
