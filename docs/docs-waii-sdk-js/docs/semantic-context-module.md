---
id: semantic-context-module
title: Semantic Context Module
---

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

A Promise resolving to a `ModifySemanticContextResponse` object containing the updated and deleted semantic statements.

The `ModifySemanticContextResponse` object represents the response of the "modify semantic context" operation and contains the following fields:

- `updated` (optional): An array of `SemanticStatement` objects representing the semantic statements that have been updated as a result of the operation. Each `SemanticStatement` object may contain the following fields:

  - `id` (optional): A string representing the unique identifier of the semantic statement.
  - `scope` (required): A string representing the scope of the semantic statement.
  - `statement` (required): A string representing the semantic statement itself.
  - `labels` (optional): An array of strings representing the labels associated with the semantic statement.

- `deleted` (optional): An array of strings representing the IDs of the semantic statements that have been deleted as a result of the operation.

Please note that the `updated` and `deleted` fields in the `ModifySemanticContextResponse` object may be optional, depending on the changes made during the "modify semantic context" operation.
   
### Getting the Semantic Context <a name="getting-the-semantic-context"></a>

This function allows you to retrieve the current semantic context.

```typescript
async function getSemanticContext(params: GetSemanticContextRequest, signal?: AbortSignal): Promise<GetSemanticContextResponse>;
```

#### Parameters:

- `params` (optional): An object containing the get semantic context request parameters.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns:

A Promise resolving to a `GetSemanticContextResponse` object containing the semantic statements.

The `GetSemanticContextResponse` object represents the response of the "get semantic context" operation and contains the following field:

- `semantic_context` (optional): An array of `SemanticStatement` objects representing the semantic statements retrieved from the server. Each `SemanticStatement` object may contain the following fields:

  - `id` (optional): A string representing the unique identifier of the semantic statement.
  - `scope` (required): A string representing the scope of the semantic statement.
  - `statement` (required): A string representing the semantic statement itself.
  - `labels` (optional): An array of strings representing the labels associated with the semantic statement.

Please note that the `semantic_context` field in the `GetSemanticContextResponse` object may be optional.
