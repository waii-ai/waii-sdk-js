import { ApiError } from "./ApiError";

class WaiiHttpClient {

    url: string;
    apiKey: string;
    timeout: number = 150000000;
    scope: string = '';
    orgId: string = '';
    userId: string = '';
    impersonateUserId: string | null = null;

    public constructor(url: string = 'http://localhost:9859/api/', apiKey: string = '') {
        this.url = url;
        this.apiKey = apiKey;
    };

    public setScope(scope: string) {
        this.scope = scope;
    };

    public getScope() {
        return this.scope
    };

    public setOrgId(orgId: string) {
        this.orgId = orgId;
    };

    public setUserId(userId: string) {
        this.userId = userId;
    };

    public getImpersonateUserId(userId: string | null) {
        return this.impersonateUserId;
    }

    public setImpersonateUserId(userId: string | null): void {
        this.impersonateUserId = userId;
    }

    public async commonFetch<Type>(
        endpoint: string,
        params: object,
        signal?: AbortSignal
    ): Promise<Type> {

        (params as any)['scope'] = this.scope;
        (params as any)['org_id'] = this.orgId;
        (params as any)['user_id'] = this.userId;

        let request = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
            signal: signal
        };
        
        if (this.impersonateUserId) {
            (request.headers as any)['x-waii-impersonate-user'] = this.impersonateUserId;
        }

        let timer;
        let fetchOrTimeout = Promise.race(
            [
                fetch(this.url + endpoint, request),
                new Promise<Response>(
                    (res, rej) => {timer = setTimeout(
                        () => rej(new ApiError(`Call timed out after ${this.timeout} ms`, 504)),
                        this.timeout
                    );}
                )
            ]
        );

        const response = await fetchOrTimeout;
        clearTimeout(timer);
        const text = await response.text();
        if (response.status === 401) {
            throw new ApiError("Authentication failed: Incorrect API key.", 401);
        }
        if (!response.ok) {
            try {
                let error = JSON.parse(text);
                throw new ApiError(error.detail, response.status);
            } catch (e) {
                throw new ApiError(text, response.status);
            }
        }
        try {
            let result: Type = JSON.parse(text);
            return result;
        } catch (e) {
            throw new ApiError("Invalid response received.", response.status);
        }
    };
};

export default WaiiHttpClient;
