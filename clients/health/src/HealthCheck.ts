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
