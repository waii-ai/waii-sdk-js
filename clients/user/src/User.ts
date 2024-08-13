import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const LIST_ACCESS_KEY_ENDPOINT: string = "list-access-keys"
const DELETE_ACCESS_KEY_ENDPOINT:string = "delete-access-keys"
const CREATE_KEY_ENDPOINT: string = "create-key"
const GET_USER_INFO_ENDPOINT: string = 'get-user-info';
const UPDATE_CONFIG_ENDPOINT: string = "update-config";
const CREATE_USER_ENDPOINT: string = "create-user";
const DELETE_USER_ENDPOINT: string = "delete-user";
const UPDATE_USER_ENDPOINT:string = "update-user"
const LIST_USERS_ENDPOINT:string = "list-users"


type GetUserInfoResponse = {
    id: string,
    name: string,
    email: string,
    roles: string[],
    permissions: string[]
}

type GetUserInfoRequest = {
}

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

class User {

    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    }

    public getInfo(
        params: GetUserInfoRequest = {},
        signal?: AbortSignal
    ): Promise<GetUserInfoResponse> {
        return this.httpClient.commonFetch<GetUserInfoResponse>(
            GET_USER_INFO_ENDPOINT,
            params,
            signal
        );
    };

     
};

export default User;
export {
    User,
    GetUserInfoRequest,
    GetUserInfoResponse
};