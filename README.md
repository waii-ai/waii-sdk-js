# WAII API Documentation

Welcome to the API documentation for WAII (Data & AI Applications). This documentation provides detailed information on how to use the API to interact with the WAII system. The API allows engineers to perform queries, generate queries, and manage the semantic context.

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

## Getting Started <a name="getting-started"></a>

To get started with the WAII API, you first need to initialize the system. Make sure you have the appropriate URL and API key.

```javascript
// Import the WAII module
import { WAII } from './waii';

// Initialize the WAII system with the URL and API key (optional)
WAII.initialize('http://localhost:9859/api/', 'your_api_key_here');
```

## Query Module <a name="query-module"></a>

### Query Generation <a name="query-generation"></a>

This function allows you to generate a query based on the provided request parameters.

```typescript
async function generate(params: QueryGenerationRequest, signal?: AbortSignal): Promise<GeneratedQuery>;
```

#### Parameters:

- `params` (required): An object containing the query generation request parameters.
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
- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

- A Promise resolving to a `DescribeQueryResponse` object containing the query description details.

## Semantic Context Module <a name="semantic-context-module"></a>

### Modifying the Semantic Context <a name="modifying-the-semantic-context"></a>

This function allows you to modify the semantic context by adding or deleting semantic statements.

```typescript
async function modifySemanticContext(params: ModifySemanticContextRequest, signal?: AbortSignal): Promise<ModifySemanticContextResponse>;
```

#### Parameters:

- `params` (required): An object containing the modify semantic context request parameters.
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

---

Congratulations! You have completed the API documentation for WAII. You can now use this documentation to build data & AI applications with the WAII system. If you have any questions or need further assistance, please refer to the contact information provided in the system's official documentation. Happy coding!
