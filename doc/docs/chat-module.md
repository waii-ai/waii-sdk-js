---
id: chat-module
title: Chat
---

The Chat module provides functions to interact with the chat-based query generation and response system.

### Common Classes

The following classes are used in the chat module for requests and responses:

Chat Request and Response:

```typescript
interface ChatRequest {
    // Common fields, same as QueryGenerationRequest
    scope: string;
    tags: string[];
    model: string;

    // User's question or prompt
    ask: string;

    // Should we stream the output?
    streaming: boolean;

    // What's the parent chat message, if any?
    parent_uuid: string;
}
```

Explanation of the fields in `ChatRequest`:
- `ask` (required): A string containing the user's question or prompt. Such as "What are the total sales for the last quarter?", "How you calculate the result?", etc.
- `parent_uuid` (optional): A string representing the UUID of the parent chat message, if any. When it is not provided, it is considered as a new chat.

```typescript
interface ChatResponseData {
    data: GetQueryResultResponse;
    sql: GeneratedQuery;
    chart_spec: ChartGenerationResponse;
    semantic_context: GetSemanticContextResponse;
    catalog: Catalog;
}

interface ChatResponse {
    response: string; // template response
    response_data: ChatResponseData;
    is_new: boolean;
    timestamp: number;
    response_uuid: string;
}
```

Explanation of the fields in `ChatResponse`:
- `response` (required): A string representing the template response.
- `response_data` (required): An object of type `ChatResponseData` containing additional response data.
- `is_new` (required): A boolean indicating whether the response uses any previous chat history. If it is a new response (not based on any previous chat), then it will be `true`.
- `timestamp` (required): A number representing the timestamp of the response.
- `response_uuid` (required): A string representing the unique identifier of the response. If you want to continue the chat, you can use this `response_uuid` as the `parent_uuid` in the next `ChatRequest`.

#### Example of `response_data`:

We generate a text response based on the user's input, which can include placeholders like {data}, {sql}, {chart_spec}, {semantic_context}, {catalog}. The caller should replace these placeholders with the actual data (whenever available) before displaying the response to the user.

How to replace placeholders depends on the caller's implementation. For example, if the caller is a `streamlit` application, it can display the data in dataframe format, the SQL query in a code block, the chart in pyplot, etc. If the caller is a react application, it can display the data in antd tables, etc.

##### Query result

This is the most common response type. The response will contain the query result data with its explanation. Assume the ask is "What are the total sales for the last quarter?", `response_data` will look like:

```
The total sales for the last quarter is 192,000 USD.

{data}
```

##### Chart result

If the response contains a chart, the response will contain the chart spec with its explanation. Assume the ask is "Can you show me the sales trend for the last 6 months?", `response_data` will look like:

```
Here is the sales trend for the last 6 months.

{chart_spec}
```

##### Combination of multiple response types

Sometimes the request can ask for both data and chart. In that case, the response will contain multiple placeholders. Assume the ask is "Can you give me query and visualization for the sales trend for the last 6 months?", `response_data` will look like:

```
Here is the query for the sales trend for the last 6 months.

{sql}

And here's the visualization.

{chart_spec}
```

### Chat Generation <a name="chat-generation"></a>

This function allows you to generate a chat response based on the provided request parameters.

```typescript
async function generate(
    params: ChatRequest,
    signal?: AbortSignal
): Promise<ChatResponse>;
```

#### Parameters:

- `params` (required): An object of type `ChatRequest` containing the chat generation request parameters. Please refer to the common classes above for the details of the `ChatRequest` object.
- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `ChatResponse` object containing the details of the generated chat response.

### Usage Examples

Here are some examples of how to use the Chat module for various interactions:

#### Starting a New Chat

To start a new chat, you can use the `generate` function without providing a `parent_uuid`:

```typescript
  const chatRequest: ChatRequest = {
    scope: 'snowflake://xyz123',
    ask: 'What are the total sales for the last quarter?'
  };

  try {
    const response = await Chat.generate(chatRequest);
    console.log('New chat response:', response.response);
    console.log('Generated SQL:', response.response_data.sql?.query);
  } catch (error) {
    console.error('Error starting new chat:', error);
  }
```

#### Continuing a Chat

To continue an existing chat, include the `parent_uuid` from the previous response:

```typescript
  const chatRequest: ChatRequest = {
    ask: 'Can you break down those sales by product category?',
    parent_uuid: <previous_response_uuid>
  };

  try {
    const response = await Chat.generate(chatRequest);
    console.log('Follow-up response:', response.response);
    console.log('Generated SQL:', response.response_data.sql?.query);
  } catch (error) {
    console.error('Error continuing chat:', error);
  }
```

#### Retrieving Chat History

To retrieve the chat history, you can use the History module. Here's an example of how to get the chat history:

```typescript
  const historyRequest: GetHistoryRequest = {
    included_types: ['chat']
  };

  try {
    const response = await History.getHistory(historyRequest);
    console.log('Chat history:', response.history);
    
    // Process each chat entry
    response.history?.forEach((entry, index) => {
      if (entry.history_type === 'chat') {
        console.log(`Chat ${index + 1}:`);
        console.log('Question:', (entry as GeneratedChatHistoryEntry).request.request);
        console.log('Response:', (entry as GeneratedChatHistoryEntry).response.response);
        console.log('---');
      }
    });
  } catch (error) {
    console.error('Error retrieving chat history:', error);
  }
```
