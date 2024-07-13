import { createBrowserClient } from '@supabase/ssr';
import {Database} from "../Definitions/definitions.ts";
import {SupabaseClient} from "@supabase/supabase-js";
// import invariant from 'tiny-invariant';
// require('dotenv').config()

let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function getClient(): SupabaseClient {
    if (client) {
        return client;
    }

    // console.log(require('dotenv').config())

    // invariant(process.env.REACT_APP_SUPABASE_URL, `Supabase URL was not provided`);
    // invariant(process.env.REACT_APP_SUPABASE_ANON_KEY, `Supabase Anon key was not provided`);

    client = createBrowserClient<Database>(
        );

    return client;
}