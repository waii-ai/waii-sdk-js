---
id: database-module
title: Database
---

The Database module provides functions to manage database connections and access schema and table information.

### Modify Database Connections <a name="modify-database-connections"></a>

This function allows you to modify existing database connections or add new ones.

```typescript
async function modifyConnections(
      params: ModifyDBConnectionRequest,
      signal?: AbortSignal)
   : Promise<ModifyDBConnectionResponse>;
```

#### Parameters:

- `params` (required): An object containing the modify database connection request parameters.

  - `updated` (optional): An array of `DBConnection` objects representing the updated database connections.
  - `removed` (optional): An array of strings representing the keys of the database connections to be removed.
  - `validate_before_save` (optional): A boolean value indicating whether to validate the changes before saving.
  - `user_id` (optional): The ID of the user performing the modification.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `ModifyDBConnectionResponse` object containing the updated connectors and diagnostics.

The `ModifyDBConnectionResponse` object represents the response of the "modify database connection" operation and contains the following fields:

- `connectors` (optional): An array of `DBConnection` objects representing the updated database connectors as a result of the operation. Each `DBConnection` object may contain the following fields:

  - `key` (required): A string representing the unique key or identifier of the database connection.
  - `db_type` (required): A string representing the type of the database (e.g., MySQL, PostgreSQL).
  - `description` (optional): A string representing a description or additional information about the database connection.
  - `account_name` (optional): A string representing the account name associated with the database connection.
  - `username` (optional): A string representing the username used to connect to the database.
  - `password` (optional): A string representing the password used to authenticate the database connection.
  - `database` (optional): A string representing the name of the specific database to connect to.
  - `warehouse` (optional): A string representing the warehouse for the database connection.
  - `role` (optional): A string representing the role associated with the database connection.
  - `path` (optional): A string representing the path to the database.
  - `parameters` (optional): An object containing additional parameters related to the database connection.
  - `sample_col_values` (optional): A boolean value denoting if you want Waii to sample string/variant columns. Allowing Waii to sample can help it to generate better queries.
  - `db_content_filters`: If you want Waii to exclude certain columns , tables from database while generating the query, you can pass the db_content_filter. This is optional.
  - `embedding_model` (optional): A string value denoting embedding model used for similarity search within the knowledge graph.
- `connector_status` (optional): An array of `ConnectorStatus` objects representing the status of the database connectors. Each `ConnectorStatus` object may contain the following fields:

  - `status` (required): A string representing the status of the database connection. Valid values are "completed", "indexing", "not-started".
  - `schema_status` (optional): An array of `SchemaIndexingStatus` objects representing the status of the schema indexing. Each `SchemaIndexingStatus` object may contain the following fields:
    - `status` (required): A string representing the status of the schema indexing. Valid values are "completed", "indexing", "not-started".
    - `n_pending_indexing_tables` (required): A number representing the number of tables pending indexing.
    - `n_total_tables` (required): A number representing the total number of tables.
   

### Get Database Connections <a name="get-database-connections"></a>

This function allows you to retrieve the list of current database connections.

```typescript
async function getConnections(
      params: GetDBConnectionRequest = {},
      signal?: AbortSignal)
   : Promise<GetDBConnectionResponse>;
```

#### Parameters:

- `params` (optional): An object containing the get database connection request parameters.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `GetDBConnectionResponse` object containing the list of database connections and diagnostics.

The `GetDBConnectionResponse` object represents the response of the "get database connections" operation and contains the following fields:

- `connectors` (optional): An array of `DBConnection` objects representing the list of database connectors retrieved from the server. Each `DBConnection` object may contain the following fields:

  - `key` (required): A string representing the unique key or identifier of the database connection.
  - `db_type` (required): A string representing the type of the database (e.g., MySQL, PostgreSQL).
  - `description` (optional): A string representing a description or additional information about the database connection.
  - `account_name` (optional): A string representing the account name associated with the database connection.
  - `username` (optional): A string representing the username used to connect to the database.
  - `password` (optional): A string representing the password used to authenticate the database connection.
  - `database` (optional): A string representing the name of the specific database to connect to.
  - `warehouse` (optional): A string representing the warehouse for the database connection.
  - `role` (optional): A string representing the role associated with the database connection.
  - `path` (optional): A string representing the path to the database.
  - `parameters` (optional): An object containing additional parameters related to the database connection.

### Get Default Connection <a name="get-default-connection"></a>

This function allows you to get default database connection for subsequent API calls.

```typescript
function getDefaultConnection(): void;
```

### Activate Connection <a name="activate-connection"></a>

This function allows you to activate a specific database connection for subsequent API calls.

```typescript
function activateConnection(key: string): void;
```

#### Parameters:

- `key` (required): The key of the database connection to activate.

### Get Catalogs <a name="get-catalogs"></a>

This function allows you to fetch information about catalogs, schemas, and tables.

```typescript
async function getCatalogs(
      params: GetCatalogRequest = {},
      signal?: AbortSignal)
   : Promise<GetCatalogResponse>;
```

#### Parameters:

- `params` (optional): An object containing the get catalogs request parameters.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `GetCatalogResponse` object containing the list of catalogs and associated schema and table information.

The `GetCatalogResponse` object represents the response of the "get catalogs" operation and contains the following fields:

- `catalogs` (optional): An array of `Catalog` objects representing the list of catalogs retrieved from the server. Each `Catalog` object may contain the following fields:
  - `name` (required): A string representing the name of the catalog.
  - `schemas` (optional): An array of `Schema` objects representing the list of schemas associated with the catalog. Each `Schema` object may contain the following fields:
    - `name` (required): A `SchemaName` object representing the name of the schema.
    - `tables` (optional): An array of `Table` objects representing the list of tables in the schema. Each `Table` object may contain the following fields:
      - `name` (required): A `TableName` object representing the name of the table.
      - `columns` (optional): An array of `Column` objects representing the list of columns in the table. Each `Column` object may contain the following fields:
        - `name` (required): A string representing the name of the column.
        - `type` (required): A string representing the data type of the column.
        - `comment` (optional): A string representing any comment or description associated with the column.
        - `sample_values` (optional): An array of `ColumnSampleValues` objects representing sample values for the column. Each `ColumnSampleValues` object may contain the following fields:
          - `values` (optional): An array of objects representing sample values for the column, along with their respective counts. Each object may have `value` (string) and `count` (number) properties.
        - `refs` (optional): An array of `TableReference` objects representing the references to other tables. Each `TableReference` object may contain the following fields:
          - `src_table` (optional): An array of `TableName` objects representing the source tables.
          - `src_cols` (optional): An array of strings representing the source columns.
          - `ref_table` (optional): An array of `TableName` objects representing the referenced tables.
          - `ref_cols` (optional): An array of strings representing the referenced columns.

  - `description` (optional): A `SchemaDescription` object representing the description of the schema.

#### Returns:
A promise resolving to a `UpdateTableDescriptionResponse` object containing the updated table description.

### Update Schema Description <a name="update-schema-description"></a>

This function allows you to update the description of a schema.

```typescript
async function updateSchemaDescription(
      params: UpdateSchemaDescriptionRequest,
      signal?: AbortSignal)
   : Promise<UpdateSchemaDescriptionResponse>;
```

#### Parameters:

- `params` (required): An object containing the modify table request parameters.

    - `schema_name` (required): A `SchemaName` object representing the name of the schema. Each `SchemaName` object may contain the following fields:
      - `schema_name` (required): The name of the schema (if applicable).
      - `database_name` (optional): The name of the database (if applicable).
    - `description` (optional): An object `SchemaDescription` representing the description of the schema. Each `SchemaDescription` object may contain the following fields:
        - summary (optional): A string representing a summary of the schema's purpose or objective.
        - detailed_steps (optional): An array of strings providing detailed steps or actions performed by the schema.
        - common_tables (optional): An array of `TableDescriptionPair` objects representing the common tables in the schema. Each `TableDescriptionPair` object may contain the following fields:
            - `name` (required): A string representing the name of the table.
            - `description` (optional): A string representing the description of the table.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:
A promise resolving to a `UpdateSchemaDescriptionResponse` object containing the updated schema description.


### Update Table Description <a name="update-table-description"></a>

This function allows you to update the description of a table.

```typescript
async function updateTableDescription(
      params: UpdateTableDescriptionRequest,
      signal?: AbortSignal)
   : Promise<UpdateTableDescriptionResponse>;
```

#### Parameters:

- `params` (required): An object containing the modify table request parameters.

    - `table_name` (required): A `TableName` object representing the name of the table. Each `TableName` object may contain the following fields:
        - `table_name` (required): The name of the table.
        - `schema_name` (optional): The name of the schema (if applicable).
        - `database_name` (optional): The name of the database (if applicable).
    - `description` (optional): A string representing the description of the table.

- `signal` (optional): An AbortSignal object for aborting the request.
