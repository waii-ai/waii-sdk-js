import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const GET_ENDPOINT: string = 'get-user-info';

type GetUserInfoResponse = {
    name: string,
    email: string,
    roles: string[],
    permissions: string[]
}

type GetUserInfoRequest = {
}

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
            GET_ENDPOINT,
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