import {getClient} from "../getClient.ts";

const client = getClient()

export async function getStylesFromClientOld() {
    const { data, error } = await client.from("ar_styles").select();
    if (error) {
        throw error;
    }
    if (data) {
        return data
    }
}