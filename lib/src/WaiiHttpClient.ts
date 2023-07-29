export default class WaiiHttpClient {
    private static instance: WaiiHttpClient;

    url: string;
    apiKey: string;
    timeout: number;
    scope: string;
    orgId: string;
    userId: string;

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

    public setOrgId(orgId: string) {
        this.orgId = orgId;
    }

    public setUserId(userId: string) {
        this.userId = userId;
    }

    public commonFetch(
        endpoint: string,
        params: object,
        callback: (result: object) => void,
        error: (detail: object) => void
    ): AbortController {

        let abortController = new AbortController();

        params['scope'] = this.scope;
        params['org_id'] = this.orgId;
        params['user_id'] = this.userId;

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params),
            signal: abortController.signal
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

        fetchOrTimeout
            .then(response => {
                response.text().then((text) => {
                    if (response.ok) {
                        callback(JSON.parse(text));
                    } else {
                        let errMsg = JSON.parse(text);
                        abortController.abort();
                        error(errMsg);
                    }
                }).catch((errMsg) => {
                    abortController.abort();
                    error(errMsg);
                });
            })
            .catch((errMsg) => {
                abortController.abort();
                error(errMsg);
            })

        return abortController;
    }
}