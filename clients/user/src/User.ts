/**
 * Copyright 2023–2025 Waii, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import WaiiHttpClient from '../../../lib/src/WaiiHttpClient';

const LIST_ACCESS_KEY_ENDPOINT = 'list-access-keys';
const DELETE_ACCESS_KEY_ENDPOINT = 'delete-access-keys';
const CREATE_KEY_ENDPOINT = 'create-key';
const GET_USER_INFO_ENDPOINT = 'get-user-info';
const UPDATE_CONFIG_ENDPOINT = 'update-config';
const CREATE_USER_ENDPOINT = 'create-user';
const DELETE_USER_ENDPOINT = 'delete-user';
const UPDATE_USER_ENDPOINT = 'update-user';
const LIST_USERS_ENDPOINT = 'list-users';
const CREATE_TENANT_ENDPOINT = 'create-tenant';
const UPDATE_TENANT_ENDPOINT = 'update-tenant';
const DELETE_TENANT_ENDPOINT = 'delete-tenant';
const LIST_TENANTS_ENDPOINT = 'list-tenants';
const CREATE_ORG_ENDPOINT = 'create-org';
const UPDATE_ORG_ENDPOINT = 'update-org';
const DELETE_ORG_ENDPOINT = 'delete-org';
const LIST_ORGS_ENDPOINT = 'list-orgs';

type GetUserInfoResponse = {
    id: string;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
};

type GetUserInfoRequest = {};

type CreateAccessKeyRequest = {
    name: string;
};

type AccessKey = {
    access_key: string;
    user_id: string;
    description?: string;
    name?: string;
    created_at?: number;
};

type GetAccessKeyResponse = {
    access_keys?: AccessKey[];
};

type GetAccessKeyRequest = {};

type DelAccessKeyRequest = {
    names: string[];
};

type DelAccessKeyResponse = {};

type UpdateConfigRequest = {
    updated?: Record<string, any>;
    deleted?: string[];
};

type UpdateConfigResponse = {
    configs: Record<string, any>;
};

type UserModel = {
    id: string;
    name?: string;
    tenant_id?: string;
    org_id?: string;
    variables?: Record<string, any>;
    roles?: string[];
};

type CreateUserRequest = {
    user: UserModel;
};

type UpdateUserRequest = {
    user: UserModel;
};

type DeleteUserRequest = {
    id: string;
};

type CommonResponse = {};

type ListUsersRequest = {
    lookup_org_id?: string;
};

type ListUsersResponse = {
    users: UserModel[];
};
type Tenant = {
    id: string; // unique id for the tenant
    name: string; // display name for the tenant
    org_id?: string; // org id for the tenant (optional)
    variables?: Record<string, any>; // optional dictionary of variables
};

type CreateTenantRequest = {
    tenant: Tenant;
};

type UpdateTenantRequest = {
    tenant: Tenant;
};

type DeleteTenantRequest = {
    id: string;
};

type ListTenantsRequest = {
    lookup_org_id?: string;
};

type ListTenantsResponse = {
    tenants: Tenant[];
};

type Organization = {
    id: string; // unique id for the organization
    name: string; // display name for the organization
    variables?: Record<string, any>; // optional dictionary of variables
};

type CreateOrganizationRequest = {
    organization: Organization;
};

type UpdateOrganizationRequest = {
    organization: Organization;
};

type DeleteOrganizationRequest = {
    id: string;
};

type ListOrganizationsRequest = {};

type ListOrganizationsResponse = {
    organizations: Organization[];
};

class User {
    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    }

    public getInfo(params: GetUserInfoRequest = {}, signal?: AbortSignal): Promise<GetUserInfoResponse> {
        return this.httpClient.commonFetch<GetUserInfoResponse>(GET_USER_INFO_ENDPOINT, params, signal);
    }

    public createAccessKey(params: CreateAccessKeyRequest, signal?: AbortSignal): Promise<GetAccessKeyResponse> {
        return this.httpClient.commonFetch<GetAccessKeyResponse>(CREATE_KEY_ENDPOINT, params, signal);
    }

    public listAccessKeys(params: GetAccessKeyRequest = {}, signal?: AbortSignal): Promise<GetAccessKeyResponse> {
        return this.httpClient.commonFetch<GetAccessKeyResponse>(LIST_ACCESS_KEY_ENDPOINT, params, signal);
    }

    public deleteAccessKey(params: DelAccessKeyRequest, signal?: AbortSignal): Promise<DelAccessKeyResponse> {
        return this.httpClient.commonFetch<DelAccessKeyResponse>(DELETE_ACCESS_KEY_ENDPOINT, params, signal);
    }

    public updateConfig(params: UpdateConfigRequest, signal?: AbortSignal): Promise<UpdateConfigResponse> {
        return this.httpClient.commonFetch<UpdateConfigResponse>(UPDATE_CONFIG_ENDPOINT, params, signal);
    }

    public createUser(params: CreateUserRequest, signal?: AbortSignal): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(CREATE_USER_ENDPOINT, params, signal);
    }

    public deleteUser(params: DeleteUserRequest, signal?: AbortSignal): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(DELETE_USER_ENDPOINT, params, signal);
    }

    public updateUser(params: UpdateUserRequest, signal?: AbortSignal): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(UPDATE_USER_ENDPOINT, params, signal);
    }

    public listUsers(params: ListUsersRequest = {}, signal?: AbortSignal): Promise<ListUsersResponse> {
        return this.httpClient.commonFetch<ListUsersResponse>(LIST_USERS_ENDPOINT, params, signal);
    }

    public createTenant(params: CreateTenantRequest, signal?: AbortSignal): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(CREATE_TENANT_ENDPOINT, params, signal);
    }

    public updateTenant(params: UpdateTenantRequest, signal?: AbortSignal): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(UPDATE_TENANT_ENDPOINT, params, signal);
    }

    public deleteTenant(params: DeleteTenantRequest, signal?: AbortSignal): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(DELETE_TENANT_ENDPOINT, params, signal);
    }

    public listTenants(params: ListTenantsRequest = {}, signal?: AbortSignal): Promise<ListTenantsResponse> {
        return this.httpClient.commonFetch<ListTenantsResponse>(LIST_TENANTS_ENDPOINT, params, signal);
    }

    public createOrganization(params: CreateOrganizationRequest, signal?: AbortSignal): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(CREATE_ORG_ENDPOINT, params, signal);
    }

    public updateOrganization(params: UpdateOrganizationRequest, signal?: AbortSignal): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(UPDATE_ORG_ENDPOINT, params, signal);
    }

    public deleteOrganization(params: DeleteOrganizationRequest, signal?: AbortSignal): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(DELETE_ORG_ENDPOINT, params, signal);
    }

    public listOrganizations(
        params: ListOrganizationsRequest = {},
        signal?: AbortSignal
    ): Promise<ListOrganizationsResponse> {
        return this.httpClient.commonFetch<ListOrganizationsResponse>(LIST_ORGS_ENDPOINT, params, signal);
    }
}

export default User;
export { User, GetUserInfoRequest, GetUserInfoResponse };
