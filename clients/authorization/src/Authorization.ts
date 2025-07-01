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
import { ModifyDBConnectionRequest, ModifyDBConnectionResponse } from "../../database/src/Database";
const O_AUTH_ENDPOINT: string = 'configure-oauth';

type OAuthConfiguration = {
  oauth_provider: string,
  redirect_uri: string
  client_id: string,
  client_secret: string
};

type AuthRequest = {
  account: string,
  oauth_configuration: OAuthConfiguration
};

type CommonResponse = {
};

class Authorization {
  private httpClient: WaiiHttpClient;

  public constructor(httpClient: WaiiHttpClient) {
    this.httpClient = httpClient;
  };

  public async authorize(
    params: AuthRequest,
    signal?: AbortSignal
  ): Promise<CommonResponse> {
    return this.httpClient.commonFetch<CommonResponse>(
      O_AUTH_ENDPOINT,
      params,
      signal
    )
  };
};

export default Authorization;
export {
  AuthRequest
}
