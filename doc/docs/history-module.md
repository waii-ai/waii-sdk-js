---
id: history-module
title: History
---

The History module provides functions to access the history of generated queries, charts, and chats within the application.

### Common Types

Here are the types used throughout the History module:

```typescript
type GeneratedQueryHistoryEntry = {
    query?: GeneratedQuery,
    request?: QueryGenerationRequest
};

type GeneratedChartHistoryEntry = {
    request?: ChartGenerationRequest,
    response?: ChartGenerationResponse
};

type GeneratedChatHistoryEntry = {
    request?: ChatRequest,
    response?: ChatResponse
};
```

### Methods

#### `list` method

```typescript
async list(
    params: GetGeneratedQueryHistoryRequest = {},
    signal?: AbortSignal
): Promise<GetGeneratedQueryHistoryResponse>;
```

This asynchronous method retrieves the history of generated queries, charts, and chats based on the specified parameters.

##### Parameters

- `params` (`GetGeneratedQueryHistoryRequest`, optional): Configuration for filtering and pagination of history entries.
- `signal` (`AbortSignal`, optional): Can be used to abort the request.

##### Return

- Returns a `Promise` resolving to `GetGeneratedQueryHistoryResponse`, which contains an array of history entries.

### Request and Response Types

#### `GetGeneratedQueryHistoryRequest`

```typescript
type GetGeneratedQueryHistoryRequest = {
    includedTypes?: GeneratedHistoryEntryType[],
    limit?: number,
    offset?: number,
    timestampSortOrder?: SortOrder,
    uuidFilter?: string
};
```

##### Fields

- `includedTypes`: Specifies the types of history entries to include (query, chart, chat).
- `limit`: Maximum number of entries to return.
- `offset`: Pagination offset.
- `timestampSortOrder`: Order of entries by timestamp ('asc' or 'desc').
- `uuidFilter`: Filter by specific UUID.

#### `GetGeneratedQueryHistoryResponse`

```typescript
type GetGeneratedQueryHistoryResponse = {
    history?: HistoryEntry[]
};
```

##### Fields

- `history`: Array of history entries of type `HistoryEntry`.

### Enums and Helper Types

#### `GeneratedHistoryEntryType`

```typescript
type GeneratedHistoryEntryType = 'query' | 'chart' | 'chat';
```

Defines the types of history entries available.

#### `SortOrder`

```typescript
type SortOrder = 'asc' | 'desc';
```

Defines the sorting order for querying history entries.

### Usage

The History module can be utilized to fetch historical data regarding different operations (queries, charts, chats) performed in the system, allowing for comprehensive insights and audits of past actions.