---
id: history-module
title: History
---

The History module provides functions to access the history of generated queries.

### Common classes

The following classes are used in the history module for query, chart and chat history entries:

```typescript
const GeneratedHistoryEntryType = Enum('query', 'chart', 'chat');
type GeneratedHistoryEntryType = Enum<typeof GeneratedHistoryEntryType>;

interface GeneratedHistoryEntryBase {
    history_type: GeneratedHistoryEntryType;
    timestamp: number; // in milliseconds, when the entry was created
}

interface GeneratedQueryHistoryEntry extends GeneratedHistoryEntryBase {
    query: GeneratedQuery;
    request: QueryGenerationRequest;
}

interface GeneratedChartHistoryEntry extends GeneratedHistoryEntryBase {
    request: ChartGenerationRequest;
    response: ChartGenerationResponse;
}

interface GeneratedChatHistoryEntry extends GeneratedHistoryEntryBase {
    request: ChatRequest;
    response: ChatResponse;
}
```

### Get History <a name="get-history"></a>

```typescript
async function getHistory(
      params: GetHistoryRequest = {},
      signal?: AbortSignal)
   : Promise<GetHistoryResponse>;
```

This function allows you to retrieve the history of generated queries, charts and chat messages: see the request and response objects below.

```typescript
interface GetHistoryRequest extends CommonRequest {
    included_types?: GeneratedHistoryEntryType[];
    limit?: number;
    offset?: number;
    timestamp_sort_order?: 'asc' | 'desc';
}
```

Explanations of the fields in `GetHistoryRequest`:
- `included_types` (optional): An array of `GeneratedHistoryEntryType` values representing the types of history entries to include in the response. The default value is `['query']`. you can pass `['query', 'chart', 'chat']` to include all types.
- `limit` (optional): A number representing the maximum number of history entries to return. The default value is `1000`.
- `offset` (optional): A number representing the offset of the first history entry to return. The default value is `0`.
- `timestamp_sort_order` (optional): A string representing the sort order of the history entries based on the timestamp. The default value is `'desc'`.

Response object:

```typescript
interface GetHistoryResponse extends CommonResponse {
    // history for generated queries, it is in flattened list, organized as new, tweak, tweak, new, tweak, tweak ..
    history?: Array<GeneratedQueryHistoryEntry | GeneratedChartHistoryEntry | GeneratedChatHistoryEntry>;
}
```

The `GetHistoryResponse` object represents the responses of past "generated query", "generated chart" and "generated chat" operations and contains the following fields. Please refer to the common classes above for the details of the `GeneratedQueryHistoryEntry`, `GeneratedChartHistoryEntry` and `GeneratedChatHistoryEntry` objects.

### Get Generated Query History <a name="get-generated-query-history"></a> (deprecated, you should use `getHistory` instead)

This function allows you to retrieve the history of generated queries.

```typescript
async function list(
      params: GetGeneratedQueryHistoryRequest = {},
      signal?: AbortSignal)
   : Promise<GetGeneratedQueryHistoryResponse>;
```

#### Parameters:

- `params` (optional): An object containing the get generated query history request parameters.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `GetGeneratedQueryHistoryResponse` object containing the list of generated query history entries.

The `GetGeneratedQueryHistoryResponse` object represents the responses of past "generated query" operations and contains the following field:

- `history` (optional): An array of `GeneratedQueryHistoryEntry` objects representing the list of generated query history entries retrieved from the server. Each `GeneratedQueryHistoryEntry` object may contain the following fields:
  - `query` (optional): A `GeneratedQuery` object representing the details of the generated query. The `GeneratedQuery` object may contain the following fields:
    - `uuid` (optional): A string representing the unique identifier of the generated query.
    - `liked` (optional): A boolean value indicating whether the query has been liked by the user.
    - `tables` (optional): An array of `TableName` objects representing the tables involved in the generated query. Each `TableName` object may contain the following fields:
      - `table_name` (required): The name of the table.
      - `schema_name` (optional): The name of the schema (if applicable).
      - `database_name` (optional): The name of the database (if applicable).
    - `semantic_context` (optional): An array of `SemanticStatement` objects representing the semantic context of the generated query. Each `SemanticStatement` object may contain the following fields:
      - `id` (optional): A string representing the unique identifier of the semantic statement.
      - `scope` (required): A string representing the scope of the semantic statement.
      - `statement` (required): A string representing the semantic statement itself.
      - `labels` (optional): An array of strings representing the labels associated with the semantic statement.
    - `query` (optional): A string representing the generated query.
    - `detailed_steps` (optional): An array of strings providing detailed steps or actions performed by the generated query.
    - `what_changed` (optional): A string representing what changed in the query.
    - `compilation_errors` (optional): An array of `CompilationError` objects representing any compilation errors that occurred during query generation. Each `CompilationError` object may contain the following fields:
      - `message` (required): A string representing the compilation error message.
      - `line` (optional): An array of numbers representing the line numbers where the compilation error occurred.
    - `is_new` (optional): A boolean value indicating whether the generated query is new.
    - `timestamp_ms` (optional): A number representing the timestamp (in milliseconds) when the query was generated.
  - `request` (optional): A `QueryGenerationRequest` object representing the request used for generating the query. The `QueryGenerationRequest` object may contain the following fields:
    - `search_context` (optional): An array of `SearchContext` objects that specify the database, schema, and table names related to the query. Each `SearchContext` object may contain the following fields:
      - `db_name` (optional): The name of the database.
      - `schema_name` (optional): The name of the schema.
      - `table_name` (optional): The name of the table.
    - `tweak_history` (optional): An array of `Tweak` objects representing the history of query tweaks applied during query generation. Each `Tweak` object may contain the following fields:
      - `sql` (optional): A string representing the SQL tweak applied.
      - `ask` (optional): A string representing the ask tweak applied.
    - `ask` (optional): A string representing the "ask" query input.
    - `uuid` (optional): A string representing the unique identifier of the generated query.
    - `dialect` (optional): A string representing the dialect used for the query.
    - `parent_uuid` (optional): A string representing the unique identifier of the parent query, if applicable.
