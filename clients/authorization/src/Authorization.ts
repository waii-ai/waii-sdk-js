import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import {ModifyDBConnectionRequest, ModifyDBConnectionResponse} from "../../database/src/Database";
const O_AUTH_ENDPOINT: string = 'configure-oauth';

type OAuthConfiguration = {
  oauth_provider: string,
  redirect_uri: string
  client_id: string,
  client_secret: string
}
type AuthRequest = {
  account: string,
  oauth_configuration: OAuthConfiguration
}

type CommonResponse = {

}

export let Authorization = (
  function () {
    return {
      authorize: async (
        params: AuthRequest,
        signal?: AbortSignal
      ): Promise<CommonResponse> => WaiiHttpClient.getInstance().commonFetch<CommonResponse>(
        O_AUTH_ENDPOINT,
        params,
        signal
      ),
    }
  })();

export default Authorization;
export {
  AuthRequest
}
