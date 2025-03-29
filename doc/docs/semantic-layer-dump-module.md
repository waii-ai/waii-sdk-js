---
id: semantic-layer-dump-module
title: Semantic Layer Dump
---

The Semantic Layer Dump module provides functionality to export and import semantic layer configurations. This module is useful for backing up and restoring semantic layer configurations across different environments or for version control purposes.

### Exporting Semantic Layer Configuration <a name="exporting-semantic-layer"></a>

This function allows you to export the semantic layer configuration for a specified database connection.

```typescript
async function export(
      params: ExportSemanticLayerDumpRequest,
      signal?: AbortSignal)
   : Promise<ExportSemanticLayerDumpResponse>;
```

#### Parameters:

- `params` (required): An object containing the export request parameters.

  - `db_conn_key` (required): A string representing the database connection key to export from.
  - `search_context` (optional): An array of `SearchContext` objects that specify which parts of the semantic layer to export. Each `SearchContext` object may contain the following fields:
    - `db_name` (optional): The name of the database.
    - `schema_name` (optional): The name of the schema.
    - `table_name` (optional): The name of the table.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to an `ExportSemanticLayerDumpResponse` object containing the operation ID.

The `ExportSemanticLayerDumpResponse` object contains the following field:

- `op_id` (required): A string representing the unique identifier of the export operation. This ID can be used to check the status of the operation.

### Checking Export Status <a name="checking-export-status"></a>

This function allows you to check the status of an ongoing export operation.

```typescript
async function checkExportStatus(
      params: CheckStatusSemanticLayerDumpRequest,
      signal?: AbortSignal)
   : Promise<CheckStatusSemanticLayerDumpResponse>;
```

#### Parameters:

- `params` (required): An object containing the check status request parameters.

  - `op_id` (required): A string representing the operation ID returned from the export operation.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `CheckStatusSemanticLayerDumpResponse` object containing the operation status.

The `CheckStatusSemanticLayerDumpResponse` object contains the following fields:

- `op_id` (required): A string representing the unique identifier of the operation.
- `status` (required): An `OperationStatus` enum value indicating the current status of the operation. Possible values are:
  - `SUCCEEDED`: The operation completed successfully.
  - `FAILED`: The operation failed.
  - `IN_PROGRESS`: The operation is still running.
  - `NOT_EXISTS`: The operation ID does not exist.
- `info` (optional): Additional information about the operation status. For successful export operations, it contains the complete dump data (the exported semantic layer configuration). For failed operations, it contains the error message as a string.

### Importing Semantic Layer Configuration <a name="importing-semantic-layer"></a>

This function allows you to import a semantic layer configuration into a specified database connection.

```typescript
async function import(
      params: ImportSemanticLayerDumpRequest,
      signal?: AbortSignal)
   : Promise<ImportSemanticLayerDumpResponse>;
```

#### Parameters:

- `params` (required): An object containing the import request parameters.

  - `db_conn_key` (required): A string representing the target database connection key to import into.
  - `configuration` (required): A record containing the semantic layer configuration to import.
  - `schema_mapping` (required): A record mapping source schema names to target schema names.
  - `database_mapping` (required): A record mapping source database names to target database names.
  - `strict_mode` (required): A boolean indicating whether to enable strict mode. When true, Waii will delete all existing configurations in the target connection and import all configurations from the dump. When false, existing configurations will be preserved and only additional configurations from the dump will be imported.
  - `dry_run_mode` (required): A boolean indicating whether to perform a dry run without making actual changes. When true, the system will validate and report what changes would be made without applying them.
  - `search_context` (optional): An array of `SearchContext` objects that specify which parts of the semantic layer to import.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to an `ImportSemanticLayerDumpResponse` object containing the operation ID.

The `ImportSemanticLayerDumpResponse` object contains the following field:

- `op_id` (required): A string representing the unique identifier of the import operation. This ID can be used to check the status of the operation.

### Checking Import Status <a name="checking-import-status"></a>

This function allows you to check the status of an ongoing import operation.

```typescript
async function checkImportStatus(
      params: CheckStatusSemanticLayerDumpRequest,
      signal?: AbortSignal)
   : Promise<CheckStatusSemanticLayerDumpResponse>;
```

#### Parameters:

- `params` (required): An object containing the check status request parameters.

  - `op_id` (required): A string representing the operation ID returned from the import operation.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `CheckStatusSemanticLayerDumpResponse` object containing the operation status.

The `CheckStatusSemanticLayerDumpResponse` object contains the following fields:

- `op_id` (required): A string representing the unique identifier of the operation.
- `status` (required): An `OperationStatus` enum value indicating the current status of the operation. Possible values are:
  - `SUCCEEDED`: The operation completed successfully.
  - `FAILED`: The operation failed.
  - `IN_PROGRESS`: The operation is still running.
  - `NOT_EXISTS`: The operation ID does not exist.
- `info` (optional): Additional information about the operation status. For successful import operations, it contains:
  - `message`: A string describing the operation result
  - `stats`: Import statistics containing counts of imported and ignored items for semantic contexts, schemas, tables, columns, content filters, liked queries, and similarity search indices
  For failed operations, it contains the error message as a string.

### Usage Example

```typescript
import WAII from 'waii-sdk';

// Export semantic layer configuration
const exportResponse = await WAII.SemanticLayerDump.export({
    db_conn_key: "your_database_connection_key",
    search_context: [ // export only the subset of configurations you want
        {
            db_name: "your_database",
            schema_name: "your_schema",
            table_name: "your_table"
        }
    ]
});

// Check export status
const exportStatus = await WAII.SemanticLayerDump.checkExportStatus({
    op_id: exportResponse.op_id
});

// Import semantic layer configuration
const importResponse = await WAII.SemanticLayerDump.import({
    db_conn_key: "target_database_connection_key",
    configuration: {
        // Your semantic layer configuration
    },
    schema_mapping: {
        // Mapping of source schema names to target schema names
    },
    database_mapping: {
        // Mapping of source database names to target database names
    },
    strict_mode: true, // Enable strict validation during import
    dry_run_mode: false // Perform a dry run without making actual changes
});

// Check import status
const importStatus = await WAII.SemanticLayerDump.checkImportStatus({
    op_id: importResponse.op_id
});
```

### Notes

- The module automatically activates the database connection before performing export or import operations
- Export and import operations are asynchronous and return an operation ID (op_id) that can be used to check the status
- The search_context parameter allows you to specify which parts of the semantic layer to export/import
- Import operations support schema and database name mapping for flexible deployment across different environments
- Import operations provide two important configuration options:
  - Strict mode: When enabled, all existing configurations in the target connection are removed before importing from the dump. When disabled, existing configurations are preserved and only new configurations are added.
  - Dry run mode: When enabled, the system validates and reports what changes would be made without actually applying them, useful for testing before performing the actual import. 