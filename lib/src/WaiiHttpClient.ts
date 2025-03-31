import { ApiError } from "./ApiError";

class WaiiHttpClient {

    url: string;
    apiKey: string;
    timeout: number = 150000000;
    scope: string = '';
    orgId: string = '';
    userId: string = '';
    impersonateUserId: string | null = null;
    private additionalHeaders: Record<string, string> = {};
    private authType: string | null = null;
    private dispatchTokenExpiredEvents: boolean = false;
    private credentials: RequestCredentials = 'include';

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

    public setAuthType(type: string | null) {
        this.authType = type;
    }

    public getAuthType(): string | null {
        return this.authType;
    }

    public setOrgId(orgId: string) {
        this.orgId = orgId;
    };

    public setUserId(userId: string) {
        this.userId = userId;
    };

    public getAdditionalHeaders(): Record<string, string> {
        return { ...this.additionalHeaders };
    }

    public getAdditionalHeader(name: string): string | undefined {
        return this.additionalHeaders[name];
    }

    public setAdditionalHeader(name: string, value: string): void {
        this.additionalHeaders[name] = value;
    }

    public removeAdditionalHeader(name: string): void {
        delete this.additionalHeaders[name];
    }

    public clearAdditionalHeaders(): void {
        this.additionalHeaders = {};
    }

    public getImpersonateUserId(userId: string | null) {
        return this.impersonateUserId;
    }

    public setImpersonateUserId(userId: string | null): void {
        this.impersonateUserId = userId;
    }

    public setDispatchTokenExpiredEvents(dispatch: boolean): void {
        this.dispatchTokenExpiredEvents = dispatch;
    }
    
    public getDispatchTokenExpiredEvents(): boolean {
        return this.dispatchTokenExpiredEvents;
    }

    public setCredentials(credentials: RequestCredentials): void {
        this.credentials = credentials;
    }

    public getCredentials(): RequestCredentials {
        return this.credentials;
    }

    public async commonFetch<Type>(
        endpoint: string,
        params: object,
        signal?: AbortSignal
    ): Promise<Type> {

        (params as any)['scope'] = this.scope;
        (params as any)['org_id'] = this.orgId;
        (params as any)['user_id'] = this.userId;

        let request : RequestInit = {
            method: 'POST',
            credentials: this.credentials,
            headers: {
                'Authorization': 'Bearer ' + this.apiKey,
                'Content-Type': 'application/json',
                ...this.additionalHeaders
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
            try {
                if (this.dispatchTokenExpiredEvents) {
                    window.dispatchEvent(new CustomEvent("waii-token-expired"));
                }
            } catch (e) {
                console.warn("token expiration dispatcher failed");
            }
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
