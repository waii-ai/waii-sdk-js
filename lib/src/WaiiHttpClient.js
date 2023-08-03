"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class WaiiHttpClient {
    constructor(url, apiKey) {
        this.timeout = 150000000;
        this.scope = '';
        this.orgId = '';
        this.userId = '';
        this.url = url;
        this.apiKey = apiKey;
    }
    static getInstance(url = 'http://localhost:9859/api/', apiKey = '') {
        if (!WaiiHttpClient.instance) {
            WaiiHttpClient.instance = new WaiiHttpClient(url, apiKey);
        }
        return WaiiHttpClient.instance;
    }
    setScope(scope) {
        this.scope = scope;
    }
    setOrgId(orgId) {
        this.orgId = orgId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    commonFetch(endpoint, params, signal) {
        return __awaiter(this, void 0, void 0, function* () {
            params['scope'] = this.scope;
            params['org_id'] = this.orgId;
            params['user_id'] = this.userId;
            let request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
                signal: signal
            };
            let fetchOrTimeout = Promise.race([
                fetch(this.url + endpoint, request),
                new Promise((res, rej) => setTimeout(() => rej(new Error(`Call timed out after ${this.timeout} ms`)), this.timeout))
            ]);
            const response = yield fetchOrTimeout;
            const text = yield response.text();
            if (!response.ok) {
                try {
                    let error = JSON.parse(text);
                    throw new Error(error.detail);
                }
                catch (e) {
                    throw new Error(text);
                }
            }
            try {
                let result = JSON.parse(text);
                return result;
            }
            catch (e) {
                throw new Error("Invalid response received.");
            }
        });
    }
}
exports.default = WaiiHttpClient;
