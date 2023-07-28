export default class WaiiHttpClient {
    private static instance: WaiiHttpClient;

    url: string;
    apiKey: string;
    timeout: number;
    scope: string;

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

    private handleError(error: object, abortController: AbortController, errorCallback: (detail: object) => void) {
        abortController.abort();
        errorCallback(error);
    }

    public async commonFetch(
        endpoint: string,
        params: object,
        callback: (result: string) => void,
        error: (detail: object) => void

    ): Promise<void> {

        let abortController = new AbortController();

        params['scope'] = this.scope;
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
                        () => rej(new Error(`timed out after ${this.timeout} ms`)),
                        this.timeout
                    ))
            ]
        );

        try {
            const response = await fetchOrTimeout;
            response.text().then((text) => {
                if (response.ok) {
                    callback(text);
                } else {
                    let obj: object = JSON.parse(text);
                    this.handleError(obj, abortController, error);
                }
            }).catch((error_2) => {
                this.handleError(error_2, abortController, error_2);
            });
        } catch (error_3) {
            this.handleError(error_3, abortController, error_3);
        }
    }
}