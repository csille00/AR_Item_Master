import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getCertTypesFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("st_cert_type")
        .select('id,cert_type');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.cert_type}))
        return result
    }
}