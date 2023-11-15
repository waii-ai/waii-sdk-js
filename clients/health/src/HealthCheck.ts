import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
const HEALTH_CHECK_ENDPOINT: string = 'health-check';


export let HealthCheck = (
  function () {
    return {
      healthCheck: async (): Promise<any> => {
        return WaiiHttpClient.getInstance().commonFetch<any>(
          HEALTH_CHECK_ENDPOINT,
          {}
        );
      }
    }
  })();

export default HealthCheck;
