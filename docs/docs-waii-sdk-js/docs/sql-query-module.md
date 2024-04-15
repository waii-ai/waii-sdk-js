---
id: sql-query-module
title: SQL Query Module
---

The Query module provides functions to generate, run, and manage SQL queries.

### Query Generation and Update <a name="query-generation"></a>

This function allows you to generate or refine/update a query based on the provided request parameters.

```typescript
async function generate(
      params: QueryGenerationRequest,
      signal?: AbortSignal)
   : Promise<GeneratedQuery>;
```

#### Parameters:

- `params` (required): An object containing the query generation request parameters.

  - `search_context` (optional): An array of `SearchContext` objects that specify the database, schema, and table names to consider during query generation. The system will automatically pick the needed objects, if this field is ommitted all the objects in the database will be considered (that's the common case).
  - `tweak_history` (optional): An array of `Tweak` objects that provide additional information for query generation. This is to interactively update a query. The Tweaks are the previous asks and response queries and these will be refined with the new ask.
  - `ask` (optional): A string containing the english language statement for the query generation. Can we a question or a description of the requested result.
  - `uuid` (optional): A unique identifier for the query.
  - `dialect` (optional): The dialect of the query: Snowflake, or PostgreSQL.
  - `parent_uuid` (optional): The parent query's unique identifier. This is for interactive sessions and refers to the UUID from the previous interaction.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `GeneratedQuery` object containing the details of the generated SQL query.

The `GeneratedQuery` object represents the details of a generated query and contains the following fields:

- `uuid` (optional): A string representing the unique identifier of the generated query. This can be later used for liking the query. Please refer to documentation of "Liking a Query".

- `liked` (optional): A boolean value indicating whether the query has been liked/favorited by the user. This is always false when the query is generated, but can be set via the "like" API.

- `tables` (optional): An array of `TableName` objects representing the tables used in the generated query (this is a subset of the search_context). Each `TableName` object may contain the following fields:

  - `table_name` (required): The name of the table.
  - `schema_name` (optional): The name of the schema (if applicable).
  - `database_name` (optional): The name of the database (if applicable).

- `semantic_context` (optional): An array of `SemanticStatement` objects representing the semantic context of the generated query. Each `SemanticStatement` object may contain the following fields:

  - `id` (optional): A string representing the unique identifier of the semantic statement.
  - `scope` (required): A string representing the scope of the semantic statement. This is either a database, schema, table or column name. The semantic statement will be considered whenever that object is involved in a query.
  - `statement` (required): A string representing the semantic statement itself (e.g.: Describes the price of an item, final price is computed as 'price - discount'). This helps understand why a query was built a certain way.
  - `labels` (optional): An array of strings representing the labels associated with the semantic statement.

- `query` (optional): A string representing the generated SQL query.

- `detailed_steps` (optional): An array of strings providing detailed steps or actions performed by the generated SQL query. This is the textual "explain plan".

- `what_changed` (optional): A string representing what changed in the query. This will be set when a generated query is refined with additional asks.

- `compilation_errors` (optional): An array of `CompilationError` objects representing any compilation errors that occurred during query generation. Each `CompilationError` object may contain the following fields:

  - `message` (required): A string representing the compilation error message.
  - `line` (optional): An array of numbers representing the line numbers where the compilation error occurred.

- `is_new` (optional): A boolean value indicating whether the generated query is new.

- `timestamp_ms` (optional): A number representing the timestamp (in milliseconds) when the query was generated.

- `confidence_score` (optional): returns logprob confidence score based on the tokens from generated queries.

- `llm_usage_stats`: token consumption during the query generation.

  - `token_total`: total token usage (prompt + completed), this doesn't include cached tokens. So if you see the total_total = 0, the query is fetched from the cache. 
 
- `elapsed_time_ms`: total elapsed time (in milli-seconds) between RPC request/response.

Please note that some fields in the `GeneratedQuery` object may be optional, and their presence depends on the details of the specific generated query.

### Running a Query <a name="running-a-query"></a>

This function allows you to run a given query.

```typescript
async function run(
      params: RunQueryRequest,
      signal?: AbortSignal)
   : Promise<GetQueryResultResponse>;
```

#### Parameters:

- `params` (required): An object containing the run query request parameters.

  - `query` (required): The query string to be executed.
  - `session_id` (optional): The session ID for the query execution. We will use the same connection for specific sessionIds, thus it's possible to use stateful statements as well (e.g: use schema, create temproary table, etc)
  - `current_schema`: The SchemaName object to use as context when running the query. Each `SchemaName` object may contain the following fields:
     - `schema_name` (required): The name of the schema (if applicable).
     - `database_name` (optional): The name of the database (if applicable).

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `GetQueryResultResponse` object containing the query result details.

The `GetQueryResultResponse` object represents the result of a query execution and contains the following fields:

- `rows` (optional): An array of objects representing the rows of the query result. Each object corresponds to a row, and its properties represent the column values.

- `more_rows` (optional): A number indicating the number of additional rows available for the query result. If the query result exceeds the maximum returned rows, this field indicates the number of remaining rows that can be fetched.

- `column_definitions` (optional): An array of `Column` objects representing the column definitions of the query result. Each `Column` object may contain the following fields:

  - `name` (required): A string representing the name of the column.
  - `type` (required): A string representing the data type of the column.
  - `comment` (optional): A string representing any comment or description associated with the column.
  - `sample_values` (optional): An array of `ColumnSampleValues` objects representing sample values for the column. Each `ColumnSampleValues` object may contain the following fields:

    - `values` (optional): An array of objects representing sample values for the column, along with their respective counts. Each object may have `value` (string) and `count` (number) properties.

- `query_uuid` (optional): A string representing the unique identifier of the query associated with the result.

Please note that some fields in the `GetQueryResultResponse` object may be optional, and their presence depends on the specific result of the executed query.

### Liking a Query <a name="liking-a-query"></a>

This function allows you to like or favorite a specific query. This helps finding queries in the query history, but also tells the system when queries are correct to learn from them.

```typescript
async function like(
      params: LikeQueryRequest,
      signal?: AbortSignal)
   : Promise<LikeQueryResponse>;
```

#### Parameters:

- `params` (required): An object containing the like query request parameters.

  - `query_uuid` (required): The unique identifier of the query to be liked or disliked.
  - `liked` (required): A boolean value indicating whether to like (true) or dislike (false) the query.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `LikeQueryResponse` object confirming the success of the operation. The `LikeQueryResponse` object has no fields, and is just a placeholder. If the query doesn't fail, the state is updated to mark the requested query as a favorite.

### Submitting a Query for Execution <a name="submitting-a-query"></a>

This function allows you to submit a query for processing. This is the same as "Running a Query" except that this function is async. It returns an id that can be used later to retrieve a query response.

```typescript
async function submit(
      params: RunQueryRequest,
      signal?: AbortSignal)
   : Promise<RunQueryResponse>;
```

#### Parameters:

- `params` (required): An object containing the submit query request parameters.

  - `query` (required): The query string to be submitted.
  - `session_id` (optional): The session ID for the query execution.
  - `current_schema`: The SchemaName object to use as context when running the query. Each `SchemaName` object may contain the following fields:
     - `schema_name` (required): The name of the schema (if applicable).
     - `database_name` (optional): The name of the database (if applicable).

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `RunQueryResponse` object containing the query ID.

The `RunQueryResponse` object represents the response of the "run query" operation and contains the following field:

- `query_id` (optional): A string representing the unique identifier of the executed query. This id is to be used in the "Get Query Results" call.
- `error_details` (optional): An object containing the error details if the query failed. The object may contain the following error code:
  - `0` (optional): Compilation failed, but no extra information is available.
  - `1` (optional): Found a table that can’t be mapped to any of the schemas within the database. A list of table also present which can’t be mapped to any of the present schema.
  - `2` (optional): Found unqualified tables that can’t be mapped to any single schema.
  - `3` (optional): Found that more than one schema contain all the unqualified tables. Schema selection is required.
- `detected_schemas`: An array of string representing the schemas which are qualified for the query. Schema selection is required.

### Getting Query Results <a name="getting-query-results"></a>

This function allows you to get the results of a previously submitted query.

```typescript
async function getResults(
      params: GetQueryResultRequest,
      signal?: AbortSignal)
   : Promise<GetQueryResultResponse>;
```

#### Parameters:

- `params` (required): An object containing the get query results request parameters.

  - `query_id` (required): The unique identifier of the query.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `GetQueryResultResponse` object containing the query result data. For a description of this object please refer to the documentation of "Running a query".

### Cancelling a Query <a name="cancelling-a-query"></a>

This function allows you to cancel a running query.

```typescript
async function cancel(
      params: CancelQueryRequest,
      signal?: AbortSignal)
   : Promise<CancelQueryResponse>;
```

#### Parameters:

- `params` (required): An object containing the cancel query request parameters.

  - `query_id` (required): The unique identifier of the query to be canceled. This is the response of the "Submit Query" api.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `CancelQueryResponse` object confirming the successful cancellation.

### Describing a Query <a name="describing-a-query"></a>

This function allows you to describe a query, providing a summary and detailed steps.

```typescript
async function describe(
      params: DescribeQueryRequest,
      signal?: AbortSignal)
   : Promise<DescribeQueryResponse>;
```

#### Parameters:

- `params` (required): An object containing the describe query request parameters.

  - `search_context` (optional): An array of `SearchContext` objects that specify the database, schema, and table names related to the query. This is optional, when provided the query processing engine will only consider objects in the search context. If ommitted, all objects in the database will be considered.
  - `current_schema` (optional): The current schema name for the query. An optional hint to the system that the query is using a particular schema.
  - `query` (optional): The query string to be described.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `DescribeQueryResponse object containing the query description details.
The DescribeQueryResponse object contains the following fields:

- `summary` (optional): A string representing a summary of the query's purpose or objective.
- `detailed_steps` (optional): An array of strings providing detailed steps or actions performed by the query.
- `tables` (optional): An array of TableName objects representing the tables involved in the query. Each TableName object may contain the following fields:

  - `table_name` (required): The name of the table.
  - `schema_name` (optional): The name of the schema (if applicable).
  - `database_name` (optional): The name of the database (if applicable).

Please note that some fields in the DescribeQueryResponse object may be optional, and their presence depends on the information available for the query or the provided search_context.

### Autocompleting a Query <a name="autocomplete-a-query"></a>

This function allows you to complete a partial query.

```typescript
async function autoComplete(
      params: AutoCompleteRequest,
      signal?: AbortSignal)
   : Promise<AutoCompleteResponse>;
```

#### Parameters:

- `params` (required): An object containing the auto-complete query request parameters.

   - `search_context` (optional): An array of `SearchContext` objects that specify the database, schema, and table names related to the query. This is optional, when provided the query processing engine will only consider objects in the search context. If ommitted, all objects in the database will be considered.
  - `text` (optional): A string containing the partial or incomplete query.
  - `cursor_offset` (optional): The offset in the `text` string where the completion is desired.
  - `dialect` (optional): The query dialect to use `Snowflake` or `PostgreSQL`
  - `max_output_tokens` (optional): Maximum number of tokens to generate.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `AutoCompleteResponse object containing the query description details.
The AutoCompleteResponse object contains the following fields:

- `text` (optional): The additional text to complete the query (to be inserted at the cursor_offset given)
  
Please note that some fields in the AutoCompleteResponse object may be optional, and their presence depends on the information available for the query or the provided search_context.


### Showing the difference between two queries <a name="diffing-a-query"></a>

This function allows you to diff two queries, providing a summary and detailed differences.

```typescript
async function diff(
      params: DiffQueryRequest,
      signal?: AbortSignal)
   : Promise<DiffQueryResponse>;
```

#### Parameters:

- `params` (required): An object containing the diff query request parameters.

  - `search_context` (optional): An array of `SearchContext` objects that specify the database, schema, and table names related to the queries. This is optional, when provided the query processing engine will only consider objects in the search context. If ommitted, all objects in the database will be considered.
  - `current_schema` (optional): The current schema name for the query. An optional hint to the system that the query is using a particular schema.
  - `query` (optional): Query string B to be diffed.
  - `previous_query` (optional): Query string A to be diffed.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `DiffQueryResponse object containing the query description details.
The DiffQueryResponse object contains the following fields:

- `summary` (optional): A string representing a summary of the query's purpose or objective.
- `detailed_steps` (optional): An array of strings providing detailed steps or actions performed by the query.
- `tables` (optional): An array of TableName objects representing the tables involved in the query. Each TableName object may contain the following fields:
  - `table_name` (required): The name of the table.
  - `schema_name` (optional): The name of the schema (if applicable).
  - `database_name` (optional): The name of the database (if applicable).
- `what_changed`: A description of the differences between the two queries.

Please note that some fields in the DiffQueryResponse object may be optional, and their presence depends on the information available for the query or the provided search_context.

### Analyzing the performance of a query <a name="performance-query"></a>

This function allows you to get a summary of the runtime of a query as well as recommendations of how to make the query run faster.

```typescript
async function analyzePeformance(
      params: QueryPerformanceRequest,
      signal?: AbortSignal)
   : Promise<QueryPerformanceResponse>;
```

#### Parameters:

- `params` (required): An object containing the performance request parameters.

  - `query_id` (optional): The uuid of the query. Can be retrieved from a query submit call, snowflake's history, or the waii query history.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `QueryPerformance` object containing the performance description details.
The QueryPerfromanceResponse object contains the following fields:

- `summary`: A string array summarizing the runtime of the query.
- `recommendations`: An array of strings providing recommendations of how to improve the runtime.
- `query_text`: The sql of the query.

### Generate questions from database schema

This function allows you to generate questions from the database schema.

```typescript
async function generateQuestion(
      params: GenerateQuestionRequest,
      signal?: AbortSignal)
   : Promise<GenerateQuestionResponse>;
```

#### Parameters
- `schema_name` (required): The name of the schema to generate questions from.
- `n_questions` (optional): The number of questions to generate. Default is 10
- `complexity` (optional): The complexity of the questions to generate. Default is "medium". Possible values are "easy", "medium", "hard".

#### Returns
- A list of questions generated from the schema.
- Each question (`GeneratedQuestion`) contains the question text, the complexity of the question, and the tables involved in the question.

#### Example
```typescript
WAII.Query.generateQuestion({
    schema_name: <schema_name like My_Schema>,
    n_questions: <n_questions>,
    complexity: "hard"
}).then((result) => {
    for (let i = 0; !(result.questions) || i < result.questions.length; i++) {
        // ... 
    }
})
```
