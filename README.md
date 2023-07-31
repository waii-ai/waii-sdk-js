# WAII API Documentation

Welcome to the API documentation for WAII (Data & AI Applications). This documentation provides detailed information on how to use the API to interact with the WAII system. The API allows engineers to perform queries, generate queries, manage the semantic context, database connections, and access query history.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Query Module](#query-module)
   - [Query Generation](#query-generation)
   - [Running a Query](#running-a-query)
   - [Liking a Query](#liking-a-query)
   - [Submitting a Query](#submitting-a-query)
   - [Getting Query Results](#getting-query-results)
   - [Cancelling a Query](#cancelling-a-query)
   - [Describing a Query](#describing-a-query)
3. [Semantic Context Module](#semantic-context-module)
   - [Modifying the Semantic Context](#modifying-the-semantic-context)
   - [Getting the Semantic Context](#getting-the-semantic-context)
4. [Database Module](#database-module)
   - [Modify Database Connections](#modify-database-connections)
   - [Get Database Connections](#get-database-connections)
   - [Activate Connection](#activate-connection)
   - [Get Catalogs](#get-catalogs)
5. [History Module](#history-module)
   - [Get Generated Query History](#get-generated-query-history)

## Getting Started <a name="getting-started"></a>

To get started with the WAII API, you first need to initialize the system. Make sure you have the appropriate URL and API key.

```javascript
// Import the WAII module
import { WAII } from './waii';

// Initialize the WAII system with the URL and API key (optional)
WAII.initialize('http://localhost:9859/api/', 'your_api_key_here');
```

## Query Module <a name="query-module"></a>

The Query module provides functions to generate, run, and manage queries.

### Query Generation <a name="query-generation"></a>

This function allows you to generate a query based on the provided request parameters.

```typescript
async function generate(params: QueryGenerationRequest, signal?: AbortSignal): Promise<GeneratedQuery>;
```

#### Parameters:

- `params` (required): An object containing the query generation request parameters.

  - `search_context` (optional): An array of `SearchContext` objects that specify the database, schema, and table names to consider during query generation.
  - `tweak_history` (optional): An array of `Tweak` objects that provide additional information for query generation, such as SQL or ASK statements.
  - `ask` (optional): A string containing the ASK statement for the query generation.
  - `uuid` (optional): A unique identifier for the query.
  - `dialect` (optional): The dialect of the query.
  - `parent_uuid` (optional): The parent query's unique identifier.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `GeneratedQuery` object containing the generated query details.

### Running a Query <a name="running-a-query"></a>

This function allows you to run a given query.

```typescript
async function run(params: RunQueryRequest, signal?: AbortSignal): Promise<GetQueryResultResponse>;
```

#### Parameters:

- `params` (required): An object containing the run query request parameters.

  - `query` (required): The query string to be executed.
  - `session_id` (optional): The session ID for the query execution.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `GetQueryResultResponse` object containing the query result details.

### Liking a Query <a name="liking-a-query"></a>

This function allows you to like or dislike a specific query.

```typescript
async function like(params: LikeQueryRequest, signal?: AbortSignal): Promise<LikeQueryResponse>;
```

#### Parameters:

- `params` (required): An object containing the like query request parameters.

  - `query_uuid` (required): The unique identifier of the query to be liked or disliked.
  - `liked` (required): A boolean value indicating whether to like (true) or dislike (false) the query.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `LikeQueryResponse` object confirming the success of the operation.

### Submitting a Query <a name="submitting-a-query"></a>

This function allows you to submit a query for processing.

```typescript
async function submit(params: RunQueryRequest, signal?: AbortSignal): Promise<RunQueryResponse>;
```

#### Parameters:

- `params` (required): An object containing the submit query request parameters.

  - `query` (required): The query string to be submitted.
  - `session_id` (optional): The session ID for the query execution.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `RunQueryResponse` object containing the query ID.

### Getting Query Results <a name="getting-query-results"></a>

This function allows you to get the results of a previously submitted query.

```typescript
async function getResults(params: GetQueryResultRequest, signal?: AbortSignal): Promise<GetQueryResultResponse>;
```

#### Parameters:

- `params` (required): An object containing the get query results request parameters.

  - `query_id` (required): The unique identifier of the query.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `GetQueryResultResponse` object containing the query result data.

### Cancelling a Query <a name="cancelling-a-query"></a>

This function allows you to cancel a running query.

```typescript
async function cancel(params: CancelQueryRequest, signal?: AbortSignal): Promise<CancelQueryResponse>;
```

#### Parameters:

- `params` (required): An object containing the cancel query request parameters.

  - `query_id` (required): The unique identifier of the query to be canceled.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `CancelQueryResponse` object confirming the successful cancellation.

### Describing a Query <a name="describing-a-query"></a>

This function allows you to describe a query, providing a summary and detailed steps.

```typescript
async function describe(params: DescribeQueryRequest, signal?: AbortSignal): Promise<DescribeQueryResponse>;
```

#### Parameters:

- `params` (required): An object containing the describe query request parameters.

  - `search_context` (optional): An array of `SearchContext` objects that specify the database, schema, and table names related to the query.
  - `current_schema` (optional): The current schema name for the query.
  - `query` (optional): The query string to be described.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `DescribeQueryResponse object containing the query description details.
The DescribeQueryResponse object contains the following fields:

summary (optional): A string representing a summary of the query's purpose or objective.

detailed_steps (optional): An array of strings providing detailed steps or actions performed by the query.

tables (optional): An array of TableName objects representing the tables involved in the query. Each TableName object may contain the following fields:

table_name (required): The name of the table.
schema_name (optional): The name of the schema (if applicable).
database_name (optional): The name of the database (if applicable).
Please note that some fields in the DescribeQueryResponse object may be optional, and their presence depends on the information available for the query or the provided search_context. The response will provide relevant information and descriptions based on the context of the query.


## Semantic Context Module <a name="semantic-context-module"></a>

The Semantic Context module provides functions to modify and retrieve the semantic context.

### Modifying the Semantic Context <a name="modifying-the-semantic-context"></a>

This function allows you to modify the semantic context by adding or deleting semantic statements.

```typescript
async function modifySemanticContext(params: ModifySemanticContextRequest, signal?: AbortSignal): Promise<ModifySemanticContextResponse>;
```

#### Parameters:

- `params` (required): An object containing the modify semantic context request parameters.

  - `updated` (optional): An array of `SemanticStatement` objects representing the updated semantic statements.
  - `deleted` (optional): An array of strings representing the IDs of the semantic statements to be deleted.
  - `validate_before_save` (optional): A boolean value indicating whether to validate the changes before saving.
  - `user_id` (optional): The ID of the user performing the modification.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `ModifySemanticContextResponse` object containing the updated and deleted semantic statements.

### Getting the Semantic Context <a name="getting-the-semantic-context"></a>

This function allows you to retrieve the current semantic context.

```typescript
async function getSemanticContext(params: GetSemanticContextRequest, signal?: AbortSignal): Promise<GetSemanticContextResponse>;
```

#### Parameters:

- `params` (optional): An object containing the get semantic context request parameters.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `GetSemanticContextResponse` object containing the semantic statements.

## Database Module <a name="database-module"></a>

The Database module provides functions to manage database connections and access schema and table information.

### Modify Database Connections <a name="modify-database-connections"></a>

This function allows you to modify existing database connections or add new ones.

```typescript
async function modifyConnections(params: ModifyDBConnectionRequest, signal?: AbortSignal): Promise<ModifyDBConnectionResponse>;
```

#### Parameters:

- `params` (required): An object containing the modify database connection request parameters.

  - `updated` (optional): An array of `DBConnection` objects representing the updated database connections.
  - `removed` (optional): An array of strings representing the keys of the database connections to be removed.
  - `validate_before_save` (optional): A boolean value indicating whether to validate the changes before saving.
  - `user_id` (optional): The ID of the user performing the modification.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `ModifyDBConnectionResponse` object containing the updated connectors and diagnostics.

### Get Database Connections <a name="get-database-connections"></a>

This function allows you to retrieve the list of current database connections.

```typescript
async function getConnections(params: GetDBConnectionRequest = {}, signal?: AbortSignal): Promise<GetDBConnectionResponse>;
```

#### Parameters:

- `params` (optional): An object containing the get database connection request parameters.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `GetDBConnectionResponse` object containing the list of database connections and diagnostics.

### Activate Connection <a name="activate-connection"></a>

This function allows you to activate a specific database connection for subsequent queries.

```typescript
function activateConnection(key: string): void;
```

#### Parameters:

- `key` (required): The key of the database connection to activate.

### Get Catalogs <a name="get-catalogs"></a>

This function allows you to fetch information about catalogs, schemas, and tables.

```typescript
async function getCatalogs(params: GetCatalogRequest = {}, signal?: AbortSignal): Promise<GetCatalogResponse>;
```

#### Parameters:

- `params` (optional): An object containing the get catalogs request parameters.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `GetCatalogResponse` object containing the list of catalogs and associated schema and table information.

## History Module <a name="history-module"></a>

The History module provides functions to access the history of generated queries.

### Get Generated Query History <a name="get-generated-query-history"></a>

This function allows you to retrieve the history of generated queries.

```typescript
async function list(params: GetGeneratedQueryHistoryRequest = {}, signal?: AbortSignal): Promise<GetGeneratedQueryHistoryResponse>;
```

#### Parameters:

- `params` (optional): An object containing the get generated query history request parameters.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `GetGeneratedQueryHistoryResponse` object containing the list of generated query history entries.

---

Congratulations! You have completed the API documentation for the WAII API. These modules provide essential functions for managing database connections, accessing schema and table information, querying data, and accessing the history of generated queries. With this information, you can now build powerful data & AI applications using the WAII system. If you have any questions or need further assistance, please refer to the contact information provided in the system's official documentation. Happy coding!
