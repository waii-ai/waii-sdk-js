export default class WaiiHttpClient {
    private static instance: WaiiHttpClient;

    url: string;
    apiKey: string;
    timeout: number = 150000000;
    scope: string = '';
    orgId: string = '';
    userId: string = '';

    private constructor(url: string, apiKey: string) {
        this.url = url;
        this.apiKey = apiKey;
    }

    public static getInstance(url: string = 'http://localhost:9859/api/', apiKey: string = ''): WaiiHttpClient {
        if (!WaiiHttpClient.instance) {
            WaiiHttpClient.instance = new WaiiHttpClient(url, apiKey);
        }

        return WaiiHttpClient.instance;
    }

    public setScope(scope: string) {
        this.scope = scope;
    }

    public getScope() {
        return this.scope
    }

    public setOrgId(orgId: string) {
        this.orgId = orgId;
    }

    public setUserId(userId: string) {
        this.userId = userId;
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
        }

        let fetchOrTimeout = Promise.race(
            [
                fetch(this.url + endpoint, request),
                new Promise<Response>(
                    (res, rej) => setTimeout(
                        () => rej(new Error(`Call timed out after ${this.timeout} ms`)),
                        this.timeout
                    ))
            ]
        );

        const response = await fetchOrTimeout;
        const text = await response.text();
        if (!response.ok) {
            try {
                let error = JSON.parse(text);
                throw new Error(error.detail);
            } catch (e) {
                throw new Error(text);
            }
        }
        try {
            let result: Type = JSON.parse(text);
            return result;
        } catch (e) {
            throw new Error("Invalid response received.");
        }
    }
}
