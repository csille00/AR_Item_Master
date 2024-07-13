import { useMemo } from 'react';
import {getClient} from "../model/getClient.ts";

function useClient() {
    return useMemo(getClient, []);
}

export default useClient;