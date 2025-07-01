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
const HEALTH_CHECK_ENDPOINT: string = 'health-check';

class HealthCheck {
  private httpClient: WaiiHttpClient;

  public constructor(httpClient: WaiiHttpClient) {
    this.httpClient = httpClient;
  }

  public async healthCheck():
    Promise<any> {
    return this.httpClient.commonFetch<any>(
      HEALTH_CHECK_ENDPOINT,
      {}
    );
  };
};

export default HealthCheck;
