---
id: user-module
title: User
---


The `User` module contains methods related to users in the system, such as managing access keys and managing users. Below are the available methods:

### Create Access Key <a name="create-access-key"></a>

This function creates a new access key for a user.

```typescript
async function createAccessKey(
      params: CreateAccessKeyRequest,
      signal?: AbortSignal)
   : Promise<GetAccessKeyResponse>;
```

#### Parameters

- `params` (required): An object containing the request parameters for creating an access key.

  - `name` (required): A string denoting the name of the access key.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `GetAccessKeyResponse` object containing the details of the created access key.

The `GetAccessKeyResponse` object contains the following fields:

- `access_keys` (optional): An array of `AccessKey` objects representing the created access keys.

  - `access_key` (required): A string representing the access key.
  - `user_id` (required): A string representing the user ID to whom the access key belongs.
  - `name` (optional): A string representing the name of the access key given at the time of creation.
  - `created_at` (optional): A number representing the timestamp when the key was created.

### List Access Keys <a name="list-access-keys"></a>

This function lists access keys of the user.

```typescript
async function listAccessKeys(
      params: GetAccessKeyRequest,
      signal?: AbortSignal)
   : Promise<GetAccessKeyResponse>;
```

#### Parameters

- `params` (required): An object containing the request parameters.It is empty in this case.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `GetAccessKeyResponse` object containing the details of the user's access keys.

The `GetAccessKeyResponse` object contains the following fields:

- `access_keys` (optional): An array of `AccessKey` objects representing the access keys.

  - `access_key` (required): A string representing the access key.
  - `user_id` (required): A string representing the user ID to whom the access key belongs.
  - `name` (optional): A string representing the name of the access key given at the time of creation.
  - `created_at` (optional): A number representing the timestamp when the key was created.

### Delete Access Key <a name="delete-access-key"></a>

This function deletes an access key of the user.

```typescript
async function deleteAccessKey(
      params: DelAccessKeyRequest,
      signal?: AbortSignal)
   : Promise<DelAccessKeyResponse>;
```

#### Parameters

- `params` (required): An object containing the request parameters for deleting access keys.

  - `names` (required): An array of strings denoting the names of the access keys to be deleted.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `DelAccessKeyResponse` object.

The `DelAccessKeyResponse` object is an empty object.

### Get User Info <a name="get-user-info"></a>

This function retrieves information about a user.

```typescript
async function getInfo(
      params: GetUserInfoRequest,
      signal?: AbortSignal)
   : Promise<GetUserInfoResponse>;
```

#### Parameters

- `params` (required): An object containing the request parameters for getting user information.It is empty in this case

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `GetUserInfoResponse` object containing the user details.

The `GetUserInfoResponse` object contains the following fields:

- `id` (required): A string representing the user ID.
- `name` (required): A string representing the user's name.
- `email` (required): A string representing the user's email.
- `roles` (required): An array of strings representing the roles assigned to the user.
- `permissions` (required): An array of strings representing the permissions assigned to the user.

### Update Config <a name="update-config"></a>

This function updates configuration settings for a user.

```typescript
async function updateConfig(
      params: UpdateConfigRequest,
      signal?: AbortSignal)
   : Promise<UpdateConfigResponse>;
```

#### Parameters

- `params` (required): An object containing the request parameters for updating the user's configuration.

  - `updated` (optional): A dictionary containing key-value pairs to update in the user's configuration.
  - `deleted` (optional): An array of strings representing the keys to be deleted from the user's configuration.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to an `UpdateConfigResponse` object containing the updated configuration details.

The `UpdateConfigResponse` object contains the following fields:

- `configs` (required): A dictionary representing the current configuration of the user.

### Create User <a name="create-user"></a>

This function creates a new user.

```typescript
async function createUser(
      params: CreateUserRequest,
      signal?: AbortSignal)
   : Promise<CommonResponse>;
```

#### Parameters

- `params` (required): An object containing the request parameters for creating a new user.

  - `user` (required): An object containing the details of the user to be created.
    - `id` (required): A string representing the unique ID of the user.
    - `name` (optional): A string representing the display name of the user.
    - `tenant_id` (optional): A string representing the tenant ID of the user.
    - `org_id` (optional): A string representing the organization ID of the user.
    - `variables` (optional): A dictionary of key-value pairs representing the user's variables.
    - `roles` (optional): An array of strings representing the roles assigned to the user.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `CommonResponse` object.

The `CommonResponse` object is an empty object.

### Delete User <a name="delete-user"></a>

This function deletes an existing user.

```typescript
async function deleteUser(
      params: DeleteUserRequest,
      signal?: AbortSignal)
   : Promise<CommonResponse>;
```

#### Parameters

- `params` (required): An object containing the request parameters for deleting a user.

  - `id` (required): A string representing the user ID of the user to be deleted.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `CommonResponse` object.

The `CommonResponse` object is an empty object.

### Update User <a name="update-user"></a>

This function updates information about an existing user.

```typescript
async function updateUser(
      params: UpdateUserRequest,
      signal?: AbortSignal)
   : Promise<CommonResponse>;
```

#### Parameters

- `params` (required): An object containing the request parameters for updating a user.

  - `user` (required): An object containing the updated details of the user.
    - `id` (required): A string representing the unique ID of the user.
    - `name` (optional): A string representing the display name of the user.
    - `tenant_id` (optional): A string representing the tenant ID of the user.
    - `org_id` (optional): A string representing the organization ID of the user.
    - `variables` (optional): A dictionary of key-value pairs representing the user's variables.
    - `roles` (optional): An array of strings representing the roles assigned to the user.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `CommonResponse` object.

The `CommonResponse` object is an empty object.

### List Users <a name="list-users"></a>

This function retrieves a list of users.

```typescript
async function listUsers(
      params: ListUsersRequest,
      signal?: AbortSignal)
   : Promise<ListUsersResponse>;
```

#### Parameters

- `params` (required): An object containing the request parameters for listing users.

  - `lookup_org_id` (optional): A string representing the organization ID for which the users are to be retrieved.

- `signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `ListUsersResponse` object containing the list of users.

The `ListUsersResponse` object contains the following fields:

- `users` (required): An array of `User` objects representing the users.

  - `id` (required): A string representing the unique ID of the user.
  - `name` (optional): A string representing the display name of the user.
  - `tenant_id` (optional): A string representing the tenant ID of the user.
  - `org_id` (optional): A string representing the organization ID of the user.
  - `variables` (optional): A dictionary of key-value pairs representing the user's variables.
  - `roles` (optional): An array of strings representing the roles assigned to the user.


### Common Types 

The `Tenant` object is defined as: 

  -	`id` (required): A string representing the unique ID of the tenant.
	-	`name` (required): A string representing the display name of the tenant.
	-	`org_id` (optional): A string representing the organization ID of the tenant.
	-	`variables` (optional): A dictionary of key-value pairs representing the tenant’s variables.

The `Organization` object is defined as: 

  -	`id` (required): A string representing the unique ID of the org.
	-	`name` (required): A string representing the display name of the org.
	-	`variables` (optional): A dictionary of key-value pairs representing the org's variables.


### Create Tenant 

This function creates a new tenant.

```typescript
async function createTenant(
params: CreateTenantRequest,
signal?: AbortSignal)
: Promise<CommonResponse>;
```

#### Parameters
	
  -	`params` (required): An object containing the request parameters for creating a new tenant.
	  -	`tenant` (required): A `Tenant` object which is defined as above.
	-	`signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `CommonResponse` object.

The `CommonResponse` object is an empty object.

### Update Tenant 

This function updates information about an existing tenant.

```typescript
async function updateTenant(
params: UpdateTenantRequest,
signal?: AbortSignal)
: Promise<CommonResponse>;
```

#### Parameters
	
  -	`params` (required): An object containing the request parameters for updating a new tenant.
	  -	`tenant` (required): A `Tenant` object which needs to be updated.
	-	`signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `CommonResponse` object.

The `CommonResponse` object is an empty object.

### Delete Tenant 

This function deletes an existing tenant.

```typescript
async function deleteTenant(
params: DeleteTenantRequest,
signal?: AbortSignal)
: Promise<CommonResponse>;
```

#### Parameters
	
  -	`params` (required): An object containing the request parameters for deleting a new tenant.
	  -	`id` (required): id of the `Tenant`  that needs to be deleted.
	
  -	`signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `CommonResponse` object.

The `CommonResponse` object is an empty object.

### List Tenants 

This function retrieves a list of tenants.

```typescript
async function listTenants(
params: ListTenantsRequest,
signal?: AbortSignal)
: Promise<ListTenantsResponse>;
```

#### Parameters
  
  -	`params` (required): An object containing the request parameters for deleting a new tenant.
    - `lookup_org_id` (optional): A string representing the organization ID for  which the tenants are to be retrieved.
	-	`signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `ListTenantsResponse` object containing the list of tenants.

The `ListTenantsResponse` object contains the following fields:
  -`tenants` (required): An array of `Tenant` objects representing the tenants.


### Create Organization 

This function creates a new tenant.

```typescript
async function createOrganization(
params: CreateOrganizationRequest,
signal?: AbortSignal)
: Promise<CommonResponse>;
```

#### Parameters
	
  -	`params` (required): An object containing the request parameters for creating a new org.
	  -	`organization` (required): A `Organization` object that needs to be created.The object is defined above.
	-	`signal` (optional): An AbortSignal object for aborting the request.

#### Returns

A Promise resolving to a `CommonResponse` object.

The `CommonResponse` object is an empty object.
