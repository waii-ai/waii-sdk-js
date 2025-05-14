---
id: chat-module
title: Chat
---

The Chat module provides functionality for handling chat-based interactions within the system, allowing users to ask questions and receive responses that could include data visualizations, SQL queries, semantic contexts, and more.

### Common Types

Here are the types used throughout the Chat module:

```typescript
type ChatRequest = {
    ask: string;
    streaming?: boolean;
    parent_uuid?: string;
    chart_type?: ChartType;
    additional_context?: SemanticStatement[];
};

type ChatResponse = {
    response: string;
    response_data: ChatResponseData;
    is_new?: boolean;
    timestamp: number;
    chat_uuid: string;
};

type ChatResponseData = {
    data?: GetQueryResultResponse;
    sql?: GeneratedQuery;
    chart_spec?: ChartGenerationResponse;
    python_plot?: any;
    semantic_context?: GetSemanticContextResponse;
    catalog?: Catalog;
};
```

### Methods

#### `chat` method

```typescript
async chat(params: ChatRequest, signal?: AbortSignal): Promise<ChatResponse>;
```

This asynchronous method is used to send a chat request and receive a corresponding response based on the user's query.

##### Parameters

- `params` (`ChatRequest`): The request parameters for the chat interaction.
- `signal` (`AbortSignal`, optional): Can be used to abort the request.

##### Return

- Returns a `Promise` resolving to `ChatResponse`, which contains the chat interaction details.

### Request and Response Details

#### `ChatRequest`

```typescript
type ChatRequest = {
    ask: string;
    streaming?: boolean;
    parent_uuid?: string;
    chart_type?: ChartType;
    additional_context?: SemanticStatement[];
};
```

##### Fields

- `ask`: User's query or command.
- `streaming`: If true, indicates a continuous stream of data/response is expected.
- `parent_uuid`: UUID of the previous related chat (if any) to maintain context.
- `chart_type`: Type of chart requested.
- `additional_context`: (optional) Additional context statements to be used during chat response generation. See [Semantic Context Module](semantic-context-module.md) for more details.

#### `ChatResponse`

```typescript
type ChatResponse = {
    response: string;
    response_data: ChatResponseData;
    is_new?: boolean;
    timestamp: number;
    chat_uuid: string;
};
```

##### Fields

- `response`: The text part of the chat response.
- `response_data`: Detailed response data including any associated data or visualizations.
- `is_new`: Indicates if this chat instance started a new context.
- `timestamp`: The timestamp of the response.
- `chat_uuid`: Unique identifier for the chat instance.

#### `ChatResponseData`

```typescript
type ChatResponseData = {
    data?: GetQueryResultResponse;
    sql?: GeneratedQuery;
    chart_spec?: ChartGenerationResponse;
    python_plot?: any;
    semantic_context?: GetSemanticContextResponse;
    catalog?: Catalog;
};
```

##### Fields

- `data`: Data related to the user's query, possibly containing query results.
- `sql`: SQL query generated in response to the user's ask.
- `chart_spec`: Details of the chart generated (if requested).
- `python_plot`: Any python plot generated as part of the response.
- `semantic_context`: Semantic context information related to the query.
- `catalog`: Details about the database schema as part of the response.

### Usage

The Chat module is designed to provide an interactive interface for users to engage with data through natural language queries