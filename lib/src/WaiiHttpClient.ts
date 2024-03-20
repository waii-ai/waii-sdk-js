class WaiiHttpClient {

    url: string;
    apiKey: string;
    timeout: number = 150000000;
    scope: string = '';
    orgId: string = '';
    userId: string = '';
    fetch_func: any;

    public constructor(url: string = 'http://localhost:9859/api/', apiKey: string = '', fetch_func = fetch) {
        this.url = url;
        this.apiKey = apiKey;
        this.fetch_func = fetch_func;
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

        let timer;
        let fetchOrTimeout = Promise.race(
            [
                this.fetch_func(this.url + endpoint, request),
                new Promise<Response>(
                    (res, rej) => {timer = setTimeout(
                        () => rej(new Error(`Call timed out after ${this.timeout} ms`)),
                        this.timeout
                    );}
                )
            ]
        );

        const response = await fetchOrTimeout;
        clearTimeout(timer);
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
    };
};

export default WaiiHttpClient;
