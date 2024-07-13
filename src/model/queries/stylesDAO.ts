import {SupabaseClient} from "@supabase/supabase-js";

export function getStyles(
    client: SupabaseClient,
) {
    return client
        .from('ar_styles')
        .select().throwOnError()
}