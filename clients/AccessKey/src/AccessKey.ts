import WaiiHttpClient from "../../../lib/src/WaiiHttpClient";
import Database from "../../database/src/Database";

const GENERATE_ENDPOINT: string = 'get-access-key';

type KeysList = {
  access_keys: string[]
}

export let AccessKey = (
  function () {
    return {
      getKeys: async (): Promise<KeysList> => {
        return WaiiHttpClient.getInstance().commonFetch<KeysList>(
          GENERATE_ENDPOINT,
          {}
        );
      }
    }
  })();

export default AccessKey;
export {
  KeysList
}
