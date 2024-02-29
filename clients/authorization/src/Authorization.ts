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
