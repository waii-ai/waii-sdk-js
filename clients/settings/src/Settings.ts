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


import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const UPDATE_PARAMETER_ENDPOINT: string = 'update-parameter';
const LIST_PARAMETERS_ENDPOINT: string = 'list-parameters';
const DELETE_PARAMETER_ENDPOINT: string = 'delete-parameter';

enum Parameters {
    LIKED_QUERIES_ENABLED = "PUBLIC.LIKED_QUERIES.ENABLED",
    LIKED_QUERIES_LEARNING_MODE = "PUBLIC.LIKED_QUERIES.LEARNING_MODE",
    REFLECTION_ENABLED = "PUBLIC.REFLECTION.ENABLED"
};

type DeleteParameterRequest = {
    parameter: string,
    target_org_id?: string,
    target_tenant_id?: string,
    target_user_id?: string,
    target_connection_key?: string,
};

type UpdateParameterRequest = {
    parameter: string,
    value: any,
    target_org_id?: string,
    target_tenant_id?: string,
    target_user_id?: string,
    target_connection_key?: string,
};

type ParameterInfo = {
    value?: any
    possible_values?: any[]
};


type ListParametersResponse = {
    parameters: { [parameter: string]: ParameterInfo}
};

type CommonRequest = {};
type CommonResponse = {};

class Settings {
    private httpClient: WaiiHttpClient;

    public constructor(httpClient: WaiiHttpClient) {
        this.httpClient = httpClient;
    }

    public async updateParameter(
        params: UpdateParameterRequest,
        signal?: AbortSignal
    ): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(
            UPDATE_PARAMETER_ENDPOINT,
            params,
            signal
        );
    };

    public async deleteParameter(
        params: DeleteParameterRequest,
        signal?: AbortSignal
    ): Promise<CommonResponse> {
        return this.httpClient.commonFetch<CommonResponse>(
            DELETE_PARAMETER_ENDPOINT,
            params,
            signal
        );
    };

    public async listParameters(
        params: CommonRequest = {},
        signal?: AbortSignal
    ): Promise<ListParametersResponse> {
        return this.httpClient.commonFetch<ListParametersResponse>(
            LIST_PARAMETERS_ENDPOINT,
            params,
            signal
        );
    };
};

export default Settings;
export {
    Parameters,
    DeleteParameterRequest,
    UpdateParameterRequest,
    ParameterInfo,
    ListParametersResponse
}
