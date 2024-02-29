import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";

const GENERATE_ENDPOINT: string = 'get-access-key';

type KeysList = {
  access_keys: string[]
};

class AccessKey {
  private httpClient: WaiiHttpClient;

  public constructor(httpClient: WaiiHttpClient) {
    this.httpClient = httpClient;
  }

  public async getKeys(): Promise<KeysList> {
    return this.httpClient.commonFetch<KeysList>(
      GENERATE_ENDPOINT,
      {}
    );
  }
};

export default AccessKey;
export {
  KeysList
}
